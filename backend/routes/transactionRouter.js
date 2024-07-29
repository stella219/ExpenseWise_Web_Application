const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const transactionController = require('../controllers/transactionController');

const transactionRouter = express.Router();

//!Add
transactionRouter.post('/api/v1/transactions/create', isAuthenticated, transactionController.create);

//!List
transactionRouter.get('/api/v1/transactions/lists', isAuthenticated, transactionController.getFilteredTransactions);

//!update
transactionRouter.put('/api/v1/transactions/update/:id', isAuthenticated, transactionController.update);

//!delete
transactionRouter.delete('/api/v1/transactions/delete/:id', isAuthenticated, transactionController.delete);

module.exports = transactionRouter; 