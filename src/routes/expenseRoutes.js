const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/authMiddleware');
const { validateExpense } = require('../middleware/validator'); // Import the shield

router.use(auth); 

router.get('/summary/stats', expenseController.getStats);
router.get('/', expenseController.getExpenses);

// Add validateExpense here 👇
router.post('/', validateExpense, expenseController.addExpense);
router.put('/:id', validateExpense, expenseController.updateExpense);

router.get('/:id', expenseController.getExpenseById);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;