const jwt = require('jsonwebtoken');

const obtainUidJWT = (token) => {

    const secret = process.env.SECRETORPRIVATEKEY;
    const { uid } = jwt.verify(token, secret);

    return uid;
};

module.exports = { obtainUidJWT };