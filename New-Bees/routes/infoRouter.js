const express = require("express")
const userController = require('../controllers/userController')
const infoRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)
const utilities = require("./utility")

infoRouter.post(':userId/editInfo',
    utilities.isLoggedIn, (req, res) =>
    userController.editInfo(req, res))


module.exports = infoRouter