const User = require('../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_API_NAME, // Your Sendinblue SMTP login
        pass: process.env.EMAIL_API_KEY  // Your Sendinblue SMTP password
    }
});

const PasswordController = {
    forgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const mailOptions = {
                from: process.env.EMAIL_API_NAME,
                to: email,
                subject: 'Password Reset',
                text: 'Your password resetting is done.'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Error sending email' });
                } else {
                    console.log('Email sent:', info.response);
                    return res.status(200).json({ message: 'Password reset email sent' });
                }
            });
        } catch (err) {
            console.error('Error processing forgot password:', err);
            res.status(500).json({ message: 'Error processing forgot password' });
        }
    }
};

module.exports = PasswordController;