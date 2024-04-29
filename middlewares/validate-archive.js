const { request, response } = require("express")



const validateArchiveUpload = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        return res.status(400).json({
            message: 'Not valid files where upload.'
        });
    }
    next();
}


module.exports = {
    validateArchiveUpload
}