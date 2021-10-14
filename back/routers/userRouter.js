const express = require("express")
const userController = require('../controllers/userController')
const infoController = require('../controllers/infoController')
const userRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)

// Register router
userRouter.post('/register', userController.UserSignup)

// Signin router
userRouter.post('/login', userController.UserLogin)


userRouter.post('/register/fillInfo',
    passport.authenticate('jwt', { session: false }), (req, res) => infoController.initInfo(req, res))
module.exports = userRouter
