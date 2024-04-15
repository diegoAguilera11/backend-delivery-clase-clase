const jwt = require("jsonwebtoken");


const generateJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('ERROR to generate token');
            } else {
                resolve(token)
            }
        });
    });
}


module.exports = generateJWT;