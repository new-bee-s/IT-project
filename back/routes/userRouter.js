const express = require("express")
const userController = require('../controllers/userController')
const userRouter = express.Router()

// Register router
userRouter.post('/register', userController.UserSignup)

// Signin router
userRouter.post('/login', userController.UserLogin)

// Logout router
userRouter.get('/logout', userController.logOut)

module.exports = userRouter
