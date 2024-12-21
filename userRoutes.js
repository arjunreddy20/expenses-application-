const express = require('express');
const ExpenseController = require('../controllers/expenseController');
const userAuthentication = require('../middleware/userAuthentication');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/expenses', userAuthentication, ExpenseController.addExpense);
router.get('/expenses', userAuthentication, ExpenseController.getExpenses);
router.delete('/expenses/:id', userAuthentication, ExpenseController.deleteExpense);
router.get('/user-details', userAuthentication, userController.getUserDetails);

module.exports = router;