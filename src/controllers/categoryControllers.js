const { Category } = require('../models');

// 1. GET ALL CATEGORIES (dyal l-user + li default)
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: {
                // Hna n-qdero n-lo3bo biha: i-jbed li m3mriyin b user_id NULL (default) 
                // ola li m-creyi l-user rasso
                user_id: [req.user.id, null] 
            }
        });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Error fetching categories" });
    }
};

// 2. ADD CUSTOM CATEGORY
exports.addCategory = async (req, res) => {
    try {
        const { name, icon } = req.body;
        const newCategory = await Category.create({
            name,
            icon: icon || 'tag', // Icon default
            user_id: req.user.id
        });
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ error: "Error saving category" });
    }
};