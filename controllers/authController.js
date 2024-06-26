const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");


const User = require("../models/user");
const Role = require("../models/role");

const generateJWT = require("../helpers/generate-jwt");






const login = async (req = request, res = response) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({ where: { email } });


        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Invalidate credentials.',
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        const userData = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            image: user.image,
            role_id: user.role_id,
            session_token: token
        }

        res.status(200).json({
            success: true,
            data: userData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}


const register = async (req = request, res = response) => {
    try {
        const { name: nameReq,
            lastName: lastNameReq,
            email: emailReq,
            password: passwordReq,
            phone: phoneReq } = req.body;

        // Get to client role
        const role = await Role.findOne({ where: { name: 'CLIENT' } });

        // Create base user data
        const userData = {
            name: nameReq,
            lastName: lastNameReq,
            email: emailReq,
            password: passwordReq,
            phone: phoneReq,
            role_id: role.id
        }

        const user = new User(userData);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

        // Destructuring especific data to user
        const { id, name, lastName, phone, email, role_id } = user;

        const dataUser = { id, name, lastName, phone, email, role_id, session_token: token };

        res.status(201).json({
            success: true,
            data: dataUser,
            message: 'User created'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: 'User not created'
        });
    }
}

const validateToken = async (req = request, res = response) => {
    const authHeader = req.headers['authorization'];

    // Separate the token from the "Bearer" prefix
    token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not in token'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const user = await User.findByPk(id);

        const {
            name,
            lastName,
            phone,
            email,
            image,
            role_id
        } = user;

        const dataUser = { id, name, lastName, phone, email, image, role_id, session_token: token };

        if (user) {
            return res.status(200).json({
                success: true,
                message: 'Token is valid',
                data: dataUser
            })
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired',
                expired: true,
                error
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error
        });
    }
}




module.exports = {
    login,
    register,
    validateToken
}