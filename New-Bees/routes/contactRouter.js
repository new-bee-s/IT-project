const express = require("express")
const userController = require('../controllers/userController')
const contactController = require('../controllers/contactController')
const contactRouter = express.Router()

// add friend router
contactRouter.post('/:_id/addFriend', userController.addFriend)

// delete friend router
contactRouter.post('/:_id/deleteFriend', contactController.deleteFriend)

contactRouter.post('/:_id/acceptFriend', contactController.acceptFriend)

contactRouter.get('/:_id/contact', contactController.getContact)

module.exports = contactRouter