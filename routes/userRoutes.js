const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, changePassword, putUser } = require("../controllers/usersController");

const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const { verifyEmailLogin } = require("../helpers/verify-email");


const router = Router();

router.get('/', [
    validateJWT
], getUsers);


router.put('/:id', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('lastName', 'The lastName is required').not().isEmpty(),
    check('phone', 'The phone is required').not().isEmpty(),
    validateFields
], putUser);



router.post('/change-password', [
    check('email', 'the field email is required').not().isEmpty(),
    check('email', 'this not valid email').isEmail(),
    check('email', 'the field email is required').custom(verifyEmailLogin),
    validateFields
], changePassword);


module.exports = router;