const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const generateJWT = require("../helpers/generate-jwt");
const Role = require("../models/role");



const register = async (req = request, res = response) => {

    try {
        const userData = req.body;

        // Get to client role
        const role = await Role.findOne({ where: { name: 'CLIENTE' } });
        userData['role_id'] = role.id;

        // Create user in DB
        const user = new User(userData);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

        // Destructiring especific data to user
        const { name, lastName, phone, email } = user;

        const dataUser = { id: user.id, name, lastName, phone, email, role_id: user.role_id };
        dataUser.session_token = token;

        return res.status(201).json({
            success: true,
            data: dataUser,
            message: 'User created'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error
        });
    }
}

module.exports = {
    register
}