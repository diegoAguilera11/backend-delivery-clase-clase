const nodemailer = require('nodemailer');

class EmailHelper {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.APP_PASSWORD
            },
        });
    }

    async sendEmail(to, subject, text, html) {
        const mailOptions = {
            from: {
                name: 'Backend Delivery',
                address: process.env.USER
            },
            to: to,
            subject: subject,
            text: text,
            html: html,
        }
        try {
            const response = await this.transporter.sendMail(mailOptions);
            console.log('Email Send: ', response);
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }
}

module.exports = new EmailHelper();