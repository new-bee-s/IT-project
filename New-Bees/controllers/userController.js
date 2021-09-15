// userController will be written on next 
require('dotenv').config()
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Contact = require('../models/contact')
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
            const body = { _id: user._id };
            const userSent = {
                userID: user.userID,
                givenName: user.givenName,
                familyName: user.familyName,
                email: user.email,
                information: user.information
            }
            //Sign the JWT token and populate the payload with the user email
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            //Send back the token to the client
            res.cookie('jwt', token, { httpOnly: false, sameSite: false, secure: true });
            res.cookie('_id', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000 });
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
            const body = { _id: user._id };
            const userSent = {
                userID: user.userID,
                givenName: user.givenName,
                familyName: user.familyName,
                email: user.email,
                information: user.information
            }
            //Sign the JWT token and populate the payload with the user email
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            //Send back the token to the client
            res.cookie('jwt', token, { httpOnly: false, sameSite: false, secure: true });
            res.cookie('_id', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.status(200).json({ success: true, data: user.id, token: token, user: userSent });
        });
    })(req, res, next)
}

const editInfo = async (req, res) => {
    let userid = req.body.data
    try {
        let givenName = req.body.givenName;
        let familyName = req.body.familyName;
        let password = req.body.password;
        let introduction = req.body.introduction;

        // Udpate the information that user has changed
        if (givenName) {
            await User.updateOne({ _id: userid }, { $set: { givenName: givenName } })
        }
        if (familyName) {
            await User.updateOne({ _id: userid }, { $set: { familyName: familyName } })
        }
        if (password) {
            await User.updateOne({ _id: userid }, { $set: { password: user.generateHash(password) } })
        }
        if (information) {
            await User.updateOne({ _id: userid }, { $set: { introduction: introduction } })
        }

        // get customer after updating
        let user = await User.findOne({ _id: userid }, {})
        res.status(200).json({ success: true, user })


    } catch (err) {
        return res.status(404).json({ success: false, error: "Website cracked" })
    }
}

// Search the user by id and return photo, givenName, familyName and email to front end
const SearchUserID = async (req, res) => {
    try {
        let user = await User.findOne({ userID: req.body.userID }, { photo: true, givenName: true, familyName: true, email: true });
        if (user) {
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
        let friend = await User.findOne({ _id: req.body._id }, { givenName: true, familyName: true })
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

module.exports = { UserSignup, UserLogin, addFriend, editInfo }
