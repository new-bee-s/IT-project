const express = require("express")
const userController = require('../controllers/userController')
const userRouter = express.Router()

const passport = require('passport');
require('../config/passport')(passport);

userRouter.get('/users', userController.users)

userRouter.post('/users', passport.authenticate('user-signup', {
    successRedirect: '/', // redirect to the homepage
    failureRedirect: '/addUser', // redirect to signup page
    failureFlash: true // allow flash messages
}))

module.exports = userRouter