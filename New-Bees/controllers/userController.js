// customerController will be written on next 
const User = require('../models/user')

const addUser = async(req, res) => {
    try {
        const newUser = new User({
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
        })
        newUser.save((err, result) => {
            if (err) res.send(err)
            return res.send(result)
        })
    } catch (err) {
        return res.send(err)
    }
}

module.exports = {
    addUser
}