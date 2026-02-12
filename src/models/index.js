const User = require('./User');
const Expense = require('./Expense');
const Category = require('./Category');
const Budget = require('./Budget');

// Relationships
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Budget);
Budget.belongsTo(User);

Category.hasMany(Expense);
Expense.belongsTo(Category);

Category.hasMany(Budget);
Budget.belongsTo(Category);

module.exports = { User, Expense, Category, Budget };