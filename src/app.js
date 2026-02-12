const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(cors()); // This allows the frontend to access your API
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);      // This makes the prefix /api/auth
app.use('/api/expenses', expenseRoutes);

module.exports = app;