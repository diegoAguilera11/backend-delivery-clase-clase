const { Router } = require("express");
const { check } = require("express-validator");

// Middlewares
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

// Controllers
const { register } = require("../controllers/usersController");


const router = new Router();

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('lastName', 'The lastName is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'This email already exists').custom(verifyEmail),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], register);



module.exports = router;