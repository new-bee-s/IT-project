const express = require("express")
const userController = require('../controllers/userController')
const userRouter = express.Router()



userRouter.post('/signin', userController.UserLogin)

module.exports = userRouter