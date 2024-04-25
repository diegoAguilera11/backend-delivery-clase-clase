const { request, response } = require("express")

const User = require("../models/user")

const emailHelper = require('../helpers/send-email');



const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            data: users,
        })
    } catch (error) {
        res.status(500).json({
            message: 'false'
        })
    }
}


const changePassword = async (req = request, res = response) => {
    const { email } = req.body;

    console.log(email);
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User is not valid'
        })
    }

    console.log(user);
    // make verification code
    const verificationCode = 123489;

    await emailHelper.sendEmail(
        user.email,
        `Código de verificación por correo electrónico: ${verificationCode}`,
        `Estimad@ ${user.name} ${user.lastName} para modificar su contraseña debe ingresar el siguiente código de verificación`,
        `<b>${verificationCode}</b>`
    );

    res.status(200).send('Email Send');

}


module.exports = {
    getUsers,
    changePassword
}