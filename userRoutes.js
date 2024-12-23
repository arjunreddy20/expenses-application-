const express = require('express');
const UserController = require('../controllers/userController');
const ExpenseController = require('../controllers/expenseController');
const NoteController = require('../controllers/noteController');
const userAuthentication = require('../middleware/userAuthentication');
const router = express.Router();

router.get('/user-details', userAuthentication, UserController.getUserDetails);
router.get('/expenses/monthly', userAuthentication, ExpenseController.getMonthlyExpenses);
router.get('/expenses/yearly', userAuthentication, ExpenseController.getYearlyExpenses);
router.get('/notes', userAuthentication, NoteController.getNotes);
router.get('/expenses/download', userAuthentication, ExpenseController.downloadExpenses);
router.post('/expenses', userAuthentication, ExpenseController.addExpense);
router.delete('/expenses/monthly/:id', userAuthentication, ExpenseController.deleteExpense);

module.exports = router;