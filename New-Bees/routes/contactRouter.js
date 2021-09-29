const express = require("express")
const userController = require('../controllers/userController')
const contactController = require('../controllers/contactController')
const contactRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)
const utilities = require("./utility")
// add friend router
contactRouter.post('/:_id/addFriend', userController.addFriend)

// delete friend router
contactRouter.post('/:_id/deleteFriend', contactController.deleteFriend)

contactRouter.post('/:_id/acceptFriend', contactController.acceptFriend)

contactRouter.get('/:_id/contact', contactController.getContact)

contactRouter.post('/:_id/changeRemark', contactController.changeRemark)
module.exports = contactRouter
