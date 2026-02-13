const { Expense, Category } = require('../models');

// 1. ADD EXPENSE
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category_id, date, description } = req.body;
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

// 2. GET ALL
exports.getExpenses = async (req, res) => {
    try {
        const { category_id } = req.query;
        let whereClause = { user_id: req.user.id };
        if (category_id) whereClause.category_id = category_id;

        const expenses = await Expense.findAll({
            where: whereClause,
            include: [Category],
            order: [['date', 'DESC']]
        });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: "Error fetching expenses" });
    }
};

// 3. GET STATS
exports.getStats = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: { user_id: req.user.id },
            include: [Category]
        });
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

// 🌟 4. GET BY ID (Hadi hiya li kant naqsak o khellat l-app t-crash!)
exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: { id: req.params.id, user_id: req.user.id },
            include: [Category]
        });
        if (!expense) return res.status(404).json({ error: "Expense not found" });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: "Error fetching expense" });
    }
};

// 5. UPDATE
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

// 6. DELETE
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