const express = require("express")
const userContoller = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/addUser', userContoller.addUser)

module.exports = userRouter