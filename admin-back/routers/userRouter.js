const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')

userRouter.get('/', userController.viewUsers)

userRouter.post('/banUser', userController.banUser)

userRouter.post('/unBanUser', userController.unbanUser)

module.exports = userRouter