const express = require("express")
const userController = require('../controllers/userController')
const infoRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)

infoRouter.post('/editInfo',
    passport.authenticate('jwt', { session: false }),
    (req, res) => userController.editInfo(req, res))

module.exports = infoRouter