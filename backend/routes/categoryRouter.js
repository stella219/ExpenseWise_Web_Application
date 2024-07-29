const express = require('express');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const categoryController = require('../controllers/categoryController');
const categoryRouter = express.Router();


//!Add
categoryRouter.post('/api/v1/categories/create', isAuthenticated, categoryController.create);

//!List
categoryRouter.get('/api/v1/categories/lists', isAuthenticated, categoryController.list);

//!update
categoryRouter.put('/api/v1/categories/update/:categoryId', isAuthenticated, categoryController.update);

//!delete
categoryRouter.delete('/api/v1/categories/delete/:id', isAuthenticated, categoryController.delete);

module.exports = categoryRouter;