const express = require("express")
const userController = require('../controllers/userController')
const contactController = require('../controllers/contactController')
const contactRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)
const utilities = require("./utility")
// Add friend router

// Delete friend router
contactRouter.post('/:_id/deleteFriend', contactController.deleteFriend)

// Accept incoming request
contactRouter.post('/:_id/acceptFriend', contactController.acceptFriend)

// Return contact 
contactRouter.get('/:_id/contact', contactController.getContact)

// Change remark of user
contactRouter.post('/:_id/changeRemark', contactController.changeRemark)

// Edit the tag
contactRouter.post('/:_id/editTag', contactController.editTag)

module.exports = contactRouter
