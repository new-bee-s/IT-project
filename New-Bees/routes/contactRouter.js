const express = require("express")
const userController = require('../controllers/userController')
const contactController = require('../controllers/contactController')
const contactRouter = express.Router()

// add friend router
contactRouter.post('/addFriend', userController.addFriend)

// delete friend router
contactRouter.post('/deleteFriend', contactController.deleteFriend)
module.exports = contactRouter