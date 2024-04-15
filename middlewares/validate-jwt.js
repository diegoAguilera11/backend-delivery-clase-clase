const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");



const validateJWT = async (req = request, res = response, next) => {
    const authHeader = req.headers['authorization'];

    // Separate the token from "Bearer" prefix
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not in token'
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired',
                expired: true
            })
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error
        })
    }

    console.log(token);
}


module.exports = { validateJWT };