const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const category = await Category.create({ name, icon });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
};