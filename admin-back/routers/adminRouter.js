const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controllers/adminController')

adminRouter.post('/login', adminController.AdminLogin)

adminRouter.post('/create', adminController.createAdmin)

module.exports = adminRouter