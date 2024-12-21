const { Expense, sequelize } = require('../models/expenseModel');
const User = require('../models/userModel');

const ExpenseController = {
    addExpense: async (req, res) => {
        const { amount, description, category } = req.body;
        const userId = req.userId; // Extracted from token

        const transaction = await sequelize.transaction();

        try {
            const expense = await Expense.create({
                amount,
                description,
                category,
                user_id: userId
            }, { transaction });

            await User.update(
                { total_expenses: sequelize.literal(`total_expenses + ${amount}`) },
                { where: { id: userId }, transaction }
            );

            await transaction.commit();
            res.status(201).json({ message: 'Expense added successfully' });
        } catch (err) {
            await transaction.rollback();
            console.error('Error adding expense:', err);
            res.status(500).json({ message: 'Error adding expense' });
        }
    },
    getExpenses: (req, res) => {
        const userId = req.userId; // Extracted from token
        Expense.findAll({ where: { user_id: userId } })
            .then(results => res.status(200).json(results))
            .catch(err => {
                console.error('Error fetching expenses:', err);
                res.status(500).json({ message: 'Error fetching expenses' });
            });
    },
    deleteExpense: async (req, res) => {
        const { id } = req.params;

        const transaction = await sequelize.transaction();

        try {
            const expense = await Expense.findOne({ where: { id } });

            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }

            const amount = expense.amount;
            const userId = expense.user_id;

            await Expense.destroy({ where: { id }, transaction });

            await User.update(
                { total_expenses: sequelize.literal(`total_expenses - ${amount}`) },
                { where: { id: userId }, transaction }
            );

            await transaction.commit();
            res.status(200).json({ message: 'Expense deleted successfully' });
        } catch (err) {
            await transaction.rollback();
            console.error('Error deleting expense:', err);
            res.status(500).json({ message: 'Error deleting expense' });
        }
    }
};

module.exports = ExpenseController;