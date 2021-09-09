const express = require("express")
const userController = require('../controllers/userController')
const userRouter = express.Router()

// register router
userRouter.post('/register', userController.UserSignup)

// signin router
userRouter.post('/signin', userController.UserLogin)

module.exports = userRouter