const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers } = require("../controllers/usersController");
const { validateJWT } = require("../middlewares/validate-jwt");


const router = Router();

router.get('/',[
    validateJWT
], getUsers);


module.exports = router;