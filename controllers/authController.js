const { response, request } = require("express");
const bcryptjs = require("bcryptjs");


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
                message: 'Invalidate credentials.'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        const userData = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
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
        const { name,
            lastName,
            email,
            password,
            phone } = req.body;

        // Get to client role
        const role = await Role.findOne({ where: { name: 'CLIENTE' } });

        // Create base user data
        const userData = {
            name,
            lastName,
            email,
            password,
            phone,
            role_id: role.id
        }

        console.log(userData);

        const user = new User(userData);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);
        await user.save();

        res.status(200).json({
            success: true,
            data: user,
            message: 'User created'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}




module.exports = {
    login,
    register
}