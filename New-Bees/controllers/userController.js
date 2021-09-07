// userController will be written on next 
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require("passport");
//const jwt = require("jsonwebtoken");
require('../config/passport')(passport)

// create a new user
const UserSignup = (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: info.message })
        }
        else if (!user) {
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
    })(req, res, next)
}

const UserLogin = (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
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
        return res.status(404).json({ success: false, error: "Website cracked" })
    }
}

const SearchUserID = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.body._id }, { photo: true, givenName: true, familyName: true, email: true }).lean();
        if (user) {
            res.status(200).json({ success: true, user: user })
        }
        else {
            res.status(400).json({ success: false, error: "User not found!" })
        }
    } catch (err) {
        res.status(404).json({ success: false })
    }
}
module.exports = { UserSignup, UserLogin }
