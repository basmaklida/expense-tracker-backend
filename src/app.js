const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
// 1. Zidi l-import dyal expenseRoutes hna
const expenseRoutes = require('./routes/expenseRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// 2. Zidi had l-starr bach l-Frontend i-qder i-sift l-masarif
app.use('/api/expenses', expenseRoutes); 

// 3. (Ikhtiyari) Zidi had l-test bach t-choufiha f l-browser dghya
app.get('/', (req, res) => {
    res.send("Backend is running successfully!");
});

module.exports = app;