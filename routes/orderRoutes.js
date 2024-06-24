const { Router } = require("express");
const { createPayment } = require("../controllers/stripeController");



const router = Router();


router.post('/payments', createPayment);


module.exports = router;