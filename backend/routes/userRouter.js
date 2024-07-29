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

//!Change password
userRouter.put('/api/v1/users/change-password', isAuthenticated, userController.changeUserPassword);

//!Update profile
userRouter.put('/api/v1/users/update-profile', isAuthenticated, userController.updateUserProfile);

module.exports = userRouter;