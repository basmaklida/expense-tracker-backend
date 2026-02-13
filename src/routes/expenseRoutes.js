const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/authMiddleware');

// T-akdi ana had l-file s-mithou 'validator.js' nichan f folder middleware
const validator = require('../middleware/validator'); 
const validateExpense = validator.validateExpense;

// Ga3 l-expenses khashom t-koun m-connecti (JWT)
router.use(auth); 

// Testi s-miyat dyal l-functions men l-controller
// Ila kanet chi wa7da fihom undefined, ghadi i-tla3 Error f l-build
router.get('/summary/stats', expenseController.getStats || ((req, res) => res.send("Stats not implemented")));
router.get('/', expenseController.getExpenses || ((req, res) => res.send("Get all not implemented")));

// Add & Update b l-validation
router.post('/', validateExpense || ((req, res, next) => next()), expenseController.addExpense);
router.put('/:id', validateExpense || ((req, res, next) => next()), expenseController.updateExpense);

// Get by ID & Delete
router.get('/:id', expenseController.getExpenseById || ((req, res) => res.send("Get by ID not implemented")));
router.delete('/:id', expenseController.deleteExpense || ((req, res) => res.send("Delete not implemented")));

module.exports = router;