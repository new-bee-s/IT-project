const express = require("express")
const userController = require('../controllers/userController')
const userRouter = express.Router()

const passport = require('passport');
require('../config/passport')(passport);

userRouter.get('/users', userController.users)

userRouter.post('/register', passport.authenticate('user-signup', {
    successRedirect: '/', // redirect to the homepage
    failureRedirect: '/register', // redirect to signup page
    failureFlash: true // allow flash messages
}))

userRouter.post('/signin', passport.authenticate('user-login', {
    successRedirect: '/', // redirect to the homepage
    failureRedirect: '/signin', // redirect to signup page
    failureFlash: true
}))

module.exports = userRouter