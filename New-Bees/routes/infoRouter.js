const express = require("express")
const infoController = require('../controllers/infoController')
const userController = require('../controllers/userController')
const infoRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)

// Edit information of the user
infoRouter.post('/:_id/editInfo', infoController.editInfo)

// Return user information
infoRouter.get('/:_id', userController.getUserInfo)

// Upload Image of user sent
infoRouter.post('/:_id/uploadImage', infoController.uploadImage)

module.exports = infoRouter
