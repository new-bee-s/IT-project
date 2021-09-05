// userController will be written on next 
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require("passport");
//const jwt = require("jsonwebtoken");
require('../config/passport')(passport)
const bcrypt = require('bcrypt-nodejs')

// create a new user
const UserSignup = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user !== null) { // email found in database
            res.status(400).json({ success: false, error: "Email has been registered!" })
        } else if (req.body.email == "" || req.body.email == null) {
            res.status(400).json({ success: false, error: "Please enter your email!" })
        } else if (req.body.givenName == "" || req.body.familyName == "" ||
            req.body.givenName == null || req.body.familyName == null) {
            res.status(400).json({ success: false, error: "Please enter your name!" })
        } else if (req.body.password == "" || req.body.password == null) {
            res.status(400).json({ success: false, error: "Please set your password!" })
        } else if (req.body.confirmPassword == "" || req.body.confirmPassword == null) {
            res.status(400).json({ success: false, error: "Please enter your confirmed password!" })
        } else if (req.body.password != req.body.confirmPassword) {
            res.status(400).json({ success: false, error: "Please confirm your password!" })
        } else if (req.body.password.length < 8) {
            res.status(400).json({ success: false, error: "Your password must be as least 8 characters!" })
        } else {
            let hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
            const user = new User({
                email: req.body.email,
                familyName: req.body.familyName,
                givenName: req.body.givenName,
                password: hash,
                contact: [],
                totalContact: 0,
                tags: []
            })
            user.save((err, NewUser) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ success: false, error: "Create failed!" })
                } else {
                    res.status(200).json({ success: true, NewUser: NewUser })
                }
            })
        }
    }
    catch (err) { // error occors
        console.log(err)
        res.status(400).json({ success: false, error: "Create failed!" })
    }
}


const UserLogin = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            // if there were errors during executing the strategy
            // or the user was not found, we display and error
            if (err) {
                return res.status(500).json({ success: false, error: info.message })
            } else if (!user) {
                return res.status(400).json({ success: false, error: info.message })
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                // const body = { _id: user.email };
                //Sign the JWT token and populate the payload with the user email
                // const token = jwt.sign({ body }, process.env.PASSPORT_KEY);
                // //Send back the token to the client
                // res.cookie('jwt', token, { httpOnly: false, sameSite: false, secure: true });
                // res.cookie('_id', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000 });
                // const data = { _id: user.id };
                return res.status(200).json({ success: true, user });
            });
        } catch (err) {
            return res.status(500).json({ success: false, error: 'Website error!' });
        }
    })(req, res, next)
}

const editInfo = async (req, res) => {
    const userid = req.session.user;
    try {
        let user = await User.findOne({ _id: userid })
        let givenName = req.body.givenName;
        let familyName = req.body.familyName;
        let password = req.body.password;

        // udpate the information that customer has changed
        if (givenName) {
            await User.updateOne({ _id: customerid }, { $set: { givenName: givenName } })
        }
        if (familyName) {
            await User.updateOne({ _id: customerid }, { $set: { familyName: familyName } })
        }
        if (password) {
            await User.updateOne({ _id: customerid }, { $set: { password: customer.generateHash(req.body.password) } })
        }

        // get customer after updating
        user = await User.findOne({ _id: customerid }, {})
        res.status(200).json({ success: true, user })


    } catch (err) {
        console.log(err)
    }
}
module.exports = { UserSignup, UserLogin }
