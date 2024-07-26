const express = require('express');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const userRouter = express.Router();

//!Register
userRouter.post('/api/v1/users/register', userController.register);

//!Login
userRouter.post('/api/v1/users/login', userController.login);

//!Profile
userRouter.get('/api/v1/users/profile', isAuthenticated, userController.profile);

module.exports = userRouter;