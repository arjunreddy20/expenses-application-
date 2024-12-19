const Expense = require('../models/expenseModel');

const ExpenseController = {
    addExpense: (req, res) => {
        const { userId, amount, description, category } = req.body;
        console.log('Adding expense for user ID:', userId); // Log the user ID to ensure it's correct
        Expense.create(userId, amount, description, category, (err, result) => {
            if (err) {
                console.error('Error adding expense:', err);
                return res.status(500).send('Error adding expense');
            }
            res.status(201).send('Expense added successfully');
        });
    },
    getExpenses: (req, res) => {
        const { userId } = req.query;
        Expense.getAllByUserId(userId, (err, results) => {
            if (err) {
                console.error('Error fetching expenses:', err);
                return res.status(500).send('Error fetching expenses');
            }
            res.status(200).json(results);
        });
    },
    deleteExpense: (req, res) => {
        const { id } = req.params;
        Expense.delete(id, (err, result) => {
            if (err) {
                console.error('Error deleting expense:', err);
                return res.status(500).send('Error deleting expense');
            }
            res.status(200).send('Expense deleted successfully');
        });
    },
};

module.exports = ExpenseController;