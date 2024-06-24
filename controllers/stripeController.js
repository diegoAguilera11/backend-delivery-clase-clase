const { request, response } = require("express");
const Stripe = require('stripe');


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createPayment = async (req = request, res = response) => {
    const { token, amount, currency, description, order } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            description: description,
            payment_method: token,
            return_url: 'http://localhost:3000/success',
            confirm: true
        });


        if (payment.ok) {
            console.log(payment);
            // TODO: Create order in database

            // TODO: Create detail order in database
            return res.status(200).json({
                success: true,
                message: 'Payment created',
                payment
            });
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Payment error',
            error
        })
    }
}

module.exports = {
    createPayment
}