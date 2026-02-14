const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); // T-sl7at hna

const app = express();

app.use(cors());
app.use(express.json());

// 1. Test Route bach t-akdi bli kolchi khdam
app.get('/', (req, res) => {
    res.send("Backend is running successfully!");
});

// 2. Auth Routes
app.use('/api/auth', authRoutes);

// 3. Expenses Routes
app.use('/api/expenses', expenseRoutes); 

// 4. Categories Routes
app.use('/api/categories', categoryRoutes);

module.exports = app;