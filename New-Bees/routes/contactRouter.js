const express = require("express")
const userController = require('../controllers/userController')
const contactRouter = express.Router()

contactRouter.post('/addFriend', userController.addFriend)

module.exports = contactRouter