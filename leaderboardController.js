const User = require('../models/userModel');

const LeaderboardController = {
    getLeaderboard: (req, res) => {
        User.getAllUsers((err, users) => {
            if (err) return res.status(500).json({ message: 'Error fetching users' });

            users.sort((a, b) => b.total_expenses - a.total_expenses);
            res.status(200).json(users);
        });
    }
};

module.exports = LeaderboardController;