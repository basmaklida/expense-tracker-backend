const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully!", user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: "Login successful", token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};