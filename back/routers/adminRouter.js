const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')

// Admin login
adminRouter.post('/login', adminController.adminLogin)

// Create an admin
adminRouter.post('/create', adminController.createAdmin)

// Admin dashboard would view all users
adminRouter.get('/dashboard', userController.viewUsers)

// Admin ban users
adminRouter.post('/dashboard/banUser', userController.banUser)

// Admin unban users
adminRouter.post('/dashboard/unBanUser', userController.unbanUser)

module.exports = adminRouter