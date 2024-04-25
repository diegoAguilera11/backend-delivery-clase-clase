const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, changePassword } = require("../controllers/usersController");

const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const { verifyEmailLogin } = require("../helpers/verify-email");


const router = Router();

router.get('/', [
    validateJWT
], getUsers);

router.post('/change-password',[
    check('email', 'the field email is required').not().isEmpty(),
    check('email', 'this not valid email').isEmail(),
    check('email', 'the field email is required').custom(verifyEmailLogin),
    validateFields
], changePassword);


module.exports = router;