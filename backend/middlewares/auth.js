const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = jwt.verify(token, JWT_SECRET);
    } catch(err) {
        return next(new Error('Необходима авторизация'))
    }

    req.user = payload;
    next();
}