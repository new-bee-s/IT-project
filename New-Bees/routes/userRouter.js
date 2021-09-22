const express = require("express")
const userController = require('../controllers/userController')
const userRouter = express.Router()

// register router
userRouter.post('/register', userController.UserSignup)

// signin router
userRouter.post('/signin', userController.UserLogin)

userRouter.get('/:_id/logout', userController.logOut)
module.exports = userRouter