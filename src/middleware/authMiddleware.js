const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Get token from the header
    const token = req.header('Authorization');

    // 2. Check if no token
    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied. 🛑" });
    }

    try {
        // 3. Handle "Bearer <token>" format (very important for Frontend & Postman)
        const tokenString = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        
        // 4. Verify the token
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

        /**
         * 5. Attach the WHOLE decoded object to req.user
         * If your token payload was { id: 1 }, then req.user will be { id: 1 }
         * This way, req.user.id will work perfectly in your controllers.
         */
        req.user = decoded; 
        
        next(); 
    } catch (err) {
        res.status(401).json({ error: "Token is not valid. ❌" });
    }
};