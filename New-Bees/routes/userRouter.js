const express = require("express")
const userController = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/register', userController.UserSignup)

userRouter.post('/signin', userController.UserLoginI)

module.exports = userRouter