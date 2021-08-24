// customerController will be written on next 
const User = require('../models/user')


const userLogin = async (req,res) => {
	try{
        // To check if the email registered
        const user = await User.findOne({email: req.body.email})
        if (user == null) { // email not found in database
			res.status(400).json({success: false, error: "Email not registered"})
		} else {
            // To match the customer password
            if (user.password == req.body.password) {
                res.status(200).json({success: true, 
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                        
                    }
                })
                
            } else {
                res.status(409).json({success: false, error: "Password incorrect"})
                // return res.send("Password incorrect")
            }
        }
	} catch (err) { // error occor
		res.status(400)
		return res.send("Database query failed")
    }
}

module.exports = {
    addUser
}