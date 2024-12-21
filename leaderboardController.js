const User = require('../models/userModel');
const Expense = require('../models/expenseModel');

const LeaderboardController = {
    getLeaderboard: (req, res) => {
        User.getAllUsers((err, users) => {
            if (err) return res.status(500).json({ message: 'Error fetching users' });

            const userExpenses = users.map(user => {
                return new Promise((resolve, reject) => {
                    Expense.getTotalExpensesByUserId(user.id, (err, totalExpenses) => {
                        if (err) return reject(err);
                        resolve({ ...user, totalExpenses });
                    });
                });
            });

            Promise.all(userExpenses)
                .then(results => {
                    results.sort((a, b) => b.totalExpenses - a.totalExpenses);
                    res.status(200).json(results);
                })
                .catch(err => res.status(500).json({ message: 'Error calculating leaderboard', details: err }));
        });
    }
};

module.exports = LeaderboardController;