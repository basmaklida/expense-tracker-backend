const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware'); // Your security guard

// --- Public Routes ---
router.post('/register', authController.register);
router.post('/login', authController.login);

// --- Protected Routes (Token Required) ---
router.get('/me', auth, authController.getMe); 

// ADD THIS LINE HERE:
router.put('/budget', auth, authController.updateBudget); 

module.exports = router;