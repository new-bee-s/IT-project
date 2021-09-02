// userController will be written on next 
const User = require('../models/user')
const Tag = require('../models/tags')

const bcrypt = require('bcrypt-nodejs')
const UserLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // To check if the email registered
        if (user == null) {
            // email not found in database
            res.status(400).json({ success: false, error: "Email not registered" })
        } else {
            // To match the user password
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (match) {
                    res.status(200).json({
                        success: true,
                        user: {
                            id: user.id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        }
                    })
                } else {
                    res.status(409).json({ success: false, error: "Password incorrect" })
                }
            })
        }
    } catch (err) { // error occor
        res.status(400).json({ success: false, error: "Database query failed" })
    }
}

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
        } else if (req.body.password.length < 8) {
            res.status(400).json({ success: false, error: "Your password must be as least 8 characters!" })
        } else if (!/\d/.test(req.body.password)) {
            res.status(400).json({ success: false, error: "Your password must contain at least one numerical digit!" })
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
                    res.status(400).json({ success: false, error: "Create failed!" })
                } else {
                    res.status(200).json({ success: true, NewUser: NewUser })
                }
            })
        }
    }
    catch (err) { // error occors
        res.status(400).json({ success: false, error: "Create failed!" })
    }
}
module.exports = { UserLogin, UserSignup }
