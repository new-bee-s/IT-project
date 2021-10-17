const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')

adminRouter.post('/login', adminController.AdminLogin)

adminRouter.post('/create', adminController.createAdmin)

adminRouter.get('/dashboard', userController.viewUsers)

adminRouter.post('/dashboard/banUser', userController.banUser)

adminRouter.post('/dashboard/unBanUser', userController.unbanUser)
module.exports = adminRouter