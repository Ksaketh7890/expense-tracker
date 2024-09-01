const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader;

    try {
        const decoded = jwt.verify(token, 'expense tracker secret');
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).send('Unauthorized');
    }
          
}

module.exports = authMiddleware;