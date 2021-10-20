const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const passport = require('passport')
require('../config/passport')(passport)
// Admin login
adminRouter.post('/login', adminController.adminLogin)

// Create an admin
adminRouter.post('/create', adminController.createAdmin)

// Admin dashboard would view all users
adminRouter.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => userController.viewUsers(req, res))

// Admin ban users
adminRouter.post('/dashboard/banUser', userController.banUser)

// Admin unban users
adminRouter.post('/dashboard/unBanUser', userController.unbanUser)

module.exports = adminRouter