const express = require('express');
const ExpenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/expenses', ExpenseController.addExpense);
router.get('/expenses', ExpenseController.getExpenses);
router.delete('/expenses/:id', ExpenseController.deleteExpense);

module.exports = router;