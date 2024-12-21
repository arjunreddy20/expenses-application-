const User = require('../models/userModel');

const LeaderboardController = {
    getLeaderboard: async (req, res) => {
        try {
            const users = await User.findAll();
            users.sort((a, b) => b.total_expenses - a.total_expenses);
            res.status(200).json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ message: 'Error fetching users' });
        }
    }
};

module.exports = LeaderboardController;