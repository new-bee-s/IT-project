const express = require("express")
const userController = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/register', userController.UserSignup)

userRouter.post('/signin', userController.UserLogin)

module.exports = userRouter