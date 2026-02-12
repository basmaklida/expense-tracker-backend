const pool = require('../config/db');

// 1. ADD EXPENSE
exports.addExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;
    try {
        const newExpense = await pool.query(
            'INSERT INTO expenses (user_id, title, amount, category, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [req.user, title, amount, category, date || new Date()]
        );
        res.status(201).json(newExpense.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Error saving expense" });
    }
};

// 2. GET ALL (With Smart Filters)
exports.getExpenses = async (req, res) => {
    try {
        const { category } = req.query;
        let query = 'SELECT * FROM expenses WHERE user_id = $1';
        let params = [req.user];

        if (category) {
            query += ' AND category = $2';
            params.push(category);
        }

        query += ' ORDER BY date DESC';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error fetching expenses" });
    }
};

// 3. GET STATS
exports.getStats = async (req, res) => {
    try {
        const stats = await pool.query(
            'SELECT category, SUM(amount) as total FROM expenses WHERE user_id = $1 GROUP BY category',
            [req.user]
        );
        const total = await pool.query('SELECT SUM(amount) as total FROM expenses WHERE user_id = $1', [req.user]);
        
        res.json({
            overallTotal: total.rows[0].total || 0,
            byCategory: stats.rows
        });
    } catch (err) {
        res.status(500).json({ error: "Error calculating stats" });
    }
};

// 4. GET SINGLE
exports.getExpenseById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM expenses WHERE id = $1 AND user_id = $2', [req.params.id, req.user]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// 5. UPDATE (The "Edit" Feature)
exports.updateExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;
    try {
        const result = await pool.query(
            'UPDATE expenses SET title=$1, amount=$2, category=$3, date=$4 WHERE id=$5 AND user_id=$6 RETURNING *',
            [title, amount, category, date, req.params.id, req.user]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
};

// 6. DELETE
exports.deleteExpense = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *', [req.params.id, req.user]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
};