const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied. 🛑" });
    }

    try {
        // Handle "Bearer <token>" format
        const tokenString = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

        // Attach user ID to the request so we know WHO is making the request
        req.user = decoded.id; 
        next(); 
    } catch (err) {
        res.status(401).json({ error: "Token is not valid. ❌" });
    }
};