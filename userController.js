const User = require('../models/userModel');

const UserController = {
    getUserDetails: async (req, res) => {
        const userId = req.userId;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                name: user.name,
                email: user.email,
                isPremiumUser: user.isPremiumUser, // Assuming you have an isPremiumUser field
                total_expenses: user.total_expenses // Ensure total_expenses is fetched
            });
        } catch (err) {
            console.error('Error fetching user details:', err);
            res.status(500).json({ message: 'Error fetching user details' });
        }
    }
};

module.exports = UserController;