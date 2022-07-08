const jwt = require('jsonwebtoken');
function authentication(req, res, next) {
    const token = req.headers['authorization'];

    // const tokenParts = token.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, 'DANIEL_KEY_67');

    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
  }

 

module.exports = { authentication };