const { Router, request, response } = require("express");


const router = Router();


router.get('/login', (req = request, res = response) => {
    res.status(200).json({
        msg: 'Desde login'
    });
});

// router.post('/login', login);




module.exports = router;