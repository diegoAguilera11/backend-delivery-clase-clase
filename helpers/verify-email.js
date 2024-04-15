const User = require("../models/user");




const verifyEmailLogin = async (email) => {
    const existEmail = await User.findOne({ where: { email } });

    if (!existEmail) {
        throw new Error('Invalidate credentials.');
    }
}


const verifyEmail = async (email) => {
    const existEmail = await User.findOne({ where: { email } });

    if (existEmail) {
        throw new Error('This email already exists');
    }
}


module.exports = {
    verifyEmailLogin,
    verifyEmail,
};