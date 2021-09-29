const User = require('../models/user')

// Get the info from web and update the information if it is not empty
const editInfo = async (req, res) => {
    try {
        let userid = req.params._id
        let user = await User.findOne({ _id: userid })
        let givenName = req.body.givenName;
        let familyName = req.body.familyName;
        let password = req.body.password;
        let introduction = req.body.introduction;
        let userID = req.body.userID
        let mobile = req.body.mobile
        let address = req.body.address
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
        if (introduction) {
            await User.updateOne({ _id: userid }, { $set: { introduction: introduction } })
        }
        if (userID) {
            await User.updateOne({ _id: userid }, { $set: { userID: userID } })
        }
        if (mobile) {
            await User.updateOne({ _id: userid }, { $set: { mobile: mobile } })
        }
        if (address) {
            await User.updateOne({ _id: userid }, { $set: { address: address } })
        }

        // get user after updating
        return res.status(200).json({ success: true })

    } catch (err) {
        return res.status(404).json({ success: false, error: "Website cracked" })
    }
}

const uploadImage = async (req, res) => {
    try {
        await User.updateOne({ _id: req.params._id }, { $set: { photo: req.body.a } })
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ success: false })
    }

}
module.exports = { editInfo, uploadImage }