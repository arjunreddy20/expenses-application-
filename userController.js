const User = require('../models/userModel');

const UserController = {
    getUserDetails: (req, res) => {
        const userId = req.userId;
        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).send('Error fetching user details');
            }
            res.status(200).json({
                name: user[0].name,
                email: user[0].email,
                isPremiumUser: user[0].isPremiumUser, // Assuming you have an isPremiumUser field
                total_expenses: user[0].total_expenses // Ensure total_expenses is fetched
            });
        });
    }
};

module.exports = UserController;