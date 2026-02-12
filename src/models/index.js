const sequelize = require('../config/db'); 
const User = require('./userModel'); 
const Category = require('./Category'); 
const Budget = require('./Budget'); 
const Expense = require('./Expense'); 
const models = {
  User,
  Expense,
  Category,
  Budget,
  sequelize // <--- Zidiha hna ila makantsh
};
// --- RELATIONSHIPS ---

// 1. User Relationships
if (User && Expense) {
    User.hasMany(Expense, { foreignKey: 'user_id' });
    Expense.belongsTo(User, { foreignKey: 'user_id' });
}

if (User && Budget) {
    User.hasMany(Budget, { foreignKey: 'user_id' });
    Budget.belongsTo(User, { foreignKey: 'user_id' });
}

// 2. Category Relationships
if (Category && Expense) {
    Category.hasMany(Expense, { foreignKey: 'category_id' });
    Expense.belongsTo(Category, { foreignKey: 'category_id' });
}

if (Category && Budget) {
    Category.hasMany(Budget, { foreignKey: 'category_id' });
    Budget.belongsTo(Category, { foreignKey: 'category_id' });
}

module.exports = {
  sequelize,
  User,
  Expense,
  Category,
  Budget
};