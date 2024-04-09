const jwt = require('jsonwebtoken');

const generateJWT = (id = '') => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '10h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Error to generate token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = generateJWT;