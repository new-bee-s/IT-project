// userController will be written on next 
const User = require('../models/user')
const Tag = require('../models/tags')

const UserLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // To check if the email registered
        if (user == null) {
            // email not found in database
            res.status(400).json({ success: false, error: "Email not registered" })
        } else {
            // To match the user password
            if (user.validPassword(user.password)) {
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
        }
    } catch (err) { // error occor
        res.status(400).json({ success: false, error: "Database query failed" })
    }
}



module.exports = { UserLogin }

