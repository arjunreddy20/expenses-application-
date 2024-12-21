const Expense = require('../models/expenseModel');

const ExpenseController = {
    addExpense: (req, res) => {
        const { amount, description, category } = req.body;
        const userId = req.userId; // Extracted from token
        console.log('Adding expense for user ID:', userId); // Log the user ID to ensure it's correct
        Expense.create(amount, description, category, userId, (err, result) => {
            if (err) {
                console.error('Error adding expense:', err);
                return res.status(500).json({ message: 'Error adding expense' });
            }
            res.status(201).json({ message: 'Expense added successfully' });
        });
    },
    getExpenses: (req, res) => {
        const userId = req.userId; // Extracted from token
        Expense.getAllByUserId(userId, (err, results) => {
            if (err) {
                console.error('Error fetching expenses:', err);
                return res.status(500).json({ message: 'Error fetching expenses' });
            }
            res.status(200).json(results);
        });
    },
    deleteExpense: (req, res) => {
        const { id } = req.params;
        Expense.delete(id, (err, result) => {
            if (err) {
                console.error('Error deleting expense:', err);
                return res.status(500).json({ message: 'Error deleting expense' });
            }
            res.status(200).json({ message: 'Expense deleted successfully' });
        });
    },
};

module.exports = ExpenseController;