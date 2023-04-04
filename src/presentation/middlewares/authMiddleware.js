const jwt = require('jsonwebtoken');


function authMiddleware() {
    return function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ error: 'Missing or invalid Authorization header' });
        }

        const token = authHeader.substring(7, authHeader.length);
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).send({ error: 'Invalid JWT token' });
        }
    };
}

module.exports = authMiddleware;
