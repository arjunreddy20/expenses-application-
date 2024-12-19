const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
    signup: (req, res) => {
        const { name, email, password } = req.body;

        // Check if the email already exists
        User.findByEmail(email, (err, existingUser) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error checking email');
            }

            if (existingUser.length > 0) {
                return res.status(400).send('Email id already exists');
            }

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return res.status(500).send('Error hashing password');

                // Create the user in the database
                User.create(name, email, hashedPassword, (err, result) => {
                    if (err) return res.status(500).send('Error creating user');
                    res.status(201).send('User created successfully');
                });
            });
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
        User.findByEmail(email, (err, results) => {
            if (err) return res.status(500).send('Error fetching user');
            if (results.length === 0) return res.status(401).send('User not found');
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) return res.status(500).send('Error comparing passwords');
                if (!isMatch) return res.status(401).send('Invalid credentials');

                // Generate JWT token
                const token = jwt.sign({ userId: results[0].id }, 'private_key');
                res.status(200).json({ token, message: 'Login successful' });
            });
        });
    },
};

module.exports = AuthController;