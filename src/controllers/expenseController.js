const { Expense, Category } = require('../models');

// 1. ADD EXPENSE
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category_id, date, description } = req.body;
        // req.user.id comes from your Auth Middleware (we'll add that next)
        const newExpense = await Expense.create({
            title,
            amount,
            category_id,
            user_id: req.user.id, 
            date: date || new Date(),
            description
        });
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: "Error saving expense", message: err.message });
    }
};

// 2. GET ALL (With Category Filter)
exports.getExpenses = async (req, res) => {
    try {
        const { category_id } = req.query;
        let whereClause = { user_id: req.user.id };

        if (category_id) {
            whereClause.category_id = category_id;
        }

        const expenses = await Expense.findAll({
            where: whereClause,
            include: [Category], // This joins the category name/icon automatically!
            order: [['date', 'DESC']]
        });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: "Error fetching expenses" });
    }
};

// 3. GET STATS (Group by Category)
exports.getStats = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: { user_id: req.user.id },
            include: [Category]
        });

        // Simple math to group totals
        const byCategory = {};
        let overallTotal = 0;

        expenses.forEach(exp => {
            const catName = exp.Category ? exp.Category.name : 'Uncategorized';
            byCategory[catName] = (byCategory[catName] || 0) + parseFloat(exp.amount);
            overallTotal += parseFloat(exp.amount);
        });

        res.json({ overallTotal, byCategory });
    } catch (err) {
        res.status(500).json({ error: "Error calculating stats" });
    }
};

// 4. UPDATE
exports.updateExpense = async (req, res) => {
    try {
        const { title, amount, category_id, date } = req.body;
        const expense = await Expense.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        
        if (!expense) return res.status(404).json({ error: "Not found" });

        await expense.update({ title, amount, category_id, date });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
};

// 5. DELETE
exports.deleteExpense = async (req, res) => {
    try {
        const deleted = await Expense.destroy({
            where: { id: req.params.id, user_id: req.user.id }
        });
        if (!deleted) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
};