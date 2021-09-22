// userController will be written on next 
require('dotenv').config()
const User = require('../models/user');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Contact = require('../models/contact');
const { isLoggedIn } = require('../routes/utility');
require('../config/passport')(passport)

// Create a new user
const UserSignup = (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: info.message })
        }
        // If the user is not found or there is some mistakes in password, return error message
        else if (!user) {
            return res.status(400).json({ success: false, error: info.message })
        }
        req.login(user, { session: false }, async (error) => {
            if (error) return next(error);
            await User.updateOne({ "_id": user._id }, { $set: { 'isLoggedIn': true } })
            const body = { _id: user._id };
            const userSent = {
                userID: user.userID,
                givenName: user.givenName,
                familyName: user.familyName,
                email: user.email,
                information: user.information,
                isLoggedIn: true,
            }

            //Sign the JWT token and populate the payload with the user email
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            //Send back the token to the client
            res.cookie('jwt', token, { httpOnly: false, sameSite: false, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            const data = { _id: user.id };
            return res.status(200).json({ success: true, data: data, token: token, user: userSent });
        });
    })(req, res, next)
}

// User log in function
const UserLogin = (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        // If there were errors during executing the strategy or the user was not found, we display and error
        if (err) {
            return res.status(500).json({ success: false, error: info.message })
        } else if (!user) {
            return res.status(400).json({ success: false, error: info.message })
        }
        req.login(user, { session: false }, async (error) => {
            if (error) return next(error);
            await User.updateOne({ "_id": user._id }, { $set: { 'isLoggedIn': true } })

            const body = { _id: user._id };
            console.log(body)
            const userSent = {
                userID: user.userID,
                givenName: user.givenName,
                familyName: user.familyName,
                email: user.email,
                information: user.information,
                gender: user.gender,
            }
            //Sign the JWT token and populate the payload with the user email
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            //Send back the token to the client
            return res.status(200).json({ success: true, data: user.id, token: token, user: user._id });
        });
    })(req, res, next)
}


// Search the user by id and return photo, givenName, familyName and email to front end
const SearchUserID = async (req, res) => {
    try {
        let user = await User.findOne({ userID: req.body.userID }, { photo: true, givenName: true, familyName: true, email: true });
        if (user) {
            if (user._id == req.params._id) {
                return res.status(200).json({ success: false, error: "You cannot search yourself" })
            }
            return res.status(200).json({ success: true, user: user })
        }
        else {
            return res.status(400).json({ success: false, error: "User not found!" })
        }
    } catch (err) {
        return res.status(404).json({ success: false })
    }
}
// Add friend according to email
const addFriend = async (req, res) => {
    try {
        let existingContact = await Contact.findOne({ friend: req.body._id, user: req.params._id })
        if (existingContact) {
            return res.status(200).json({ success: false, error: "You have added this user" })
        }
        let newContact = new Contact({
            user: req.params._id,
            friend: req.body._id,
            status: "pending",
            tag: "",
            remark: ""
        })
        newContact.save(err => {
            if (err) throw err
            return res.status(200).json({ success: true })
        })

    } catch (err) {
        console.log(err)
    }
}

const getUserInfo = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params._id }, {})
        if (user) {
            return res.status(200).json({ success: true, user: user })
        }
        else {
            return res.status(400).json({ success: false, error: 'user not found' })
        }
    } catch (err) {
        return res.status(404).json({ success: false })
    }
}

const logOut = async (req, res) => {
    try {
        await User.updateOne({ "_id": req.params._id }, { $set: { 'isLoggedIn': false } })
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(404).json({ success: false })
    }
}
module.exports = { UserSignup, UserLogin, addFriend, getUserInfo, logOut }
