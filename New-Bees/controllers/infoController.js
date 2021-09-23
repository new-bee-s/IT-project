const User = require('../models/user')

const editInfo = async (req, res) => {
    try {
        let userid = req.params._id
        let givenName = req.body.givenName;
        let familyName = req.body.familyName;
        let password = req.body.password;
        let introduction = req.body.introduction;
        let userID = req.body.userID
        let mobile = req.body.mobile
        let address = req.body.address
        let email = req.body.email
        // Udpate the information that user has changed
        if (givenName) {
            await User.updateOne({ _id: userid }, { $set: { givenName: givenName } })
        }
        else if (familyName) {
            await User.updateOne({ _id: userid }, { $set: { familyName: familyName } })
        }
        else if (password) {
            await User.updateOne({ _id: userid }, { $set: { password: user.generateHash(password) } })
        }
        else if (introduction) {
            await User.updateOne({ _id: userid }, { $set: { introduction: introduction } })
        }
        else if (userID) {
            await User.updateOne({ _id: userid }, { $set: { userID: userID } })
        }
        else if (mobile) {
            await User.updateOne({ _id: userid }, { $set: { mobile: mobile } })
        }
        else if (address) {
            await User.updateOne({ _id: userid }, { $set: { address: address } })
        }
        else if (email) {
            await User.updateOne({ _id: userid }, { $set: { email: email } })
        }

        // get user after updating
        return res.status(200).json({ success: true })

    } catch (err) {
        return res.status(404).json({ success: false, error: "Website cracked" })
    }
}
module.exports = { editInfo }