require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log('coucou')
    const token = req.headers.authorization;

    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch(err){
        res.status(401).json({ message: err.message });
    }
};