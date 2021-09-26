const express = require("express")
const infoController = require('../controllers/infoController')
const userController = require('../controllers/userController')
const infoRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)

infoRouter.post('/:_id/editInfo', infoController.editInfo)

infoRouter.get('/:_id', userController.getUserInfo)


module.exports = infoRouter