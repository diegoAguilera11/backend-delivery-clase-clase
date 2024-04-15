const { request, response } = require("express")
const User = require("../models/user")




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


module.exports = {
    getUsers
}