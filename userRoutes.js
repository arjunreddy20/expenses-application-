const express = require('express');
const ExpenseController = require('../controllers/expenseController');
const userAuthentication = require('../middleware/userAuthentication');

const router = express.Router();

router.post('/expenses', userAuthentication, ExpenseController.addExpense);
router.get('/expenses', userAuthentication, ExpenseController.getExpenses);
router.delete('/expenses/:id', userAuthentication, ExpenseController.deleteExpense);

module.exports = router;