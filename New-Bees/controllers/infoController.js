const User = require('../models/user')

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
module.exports = { editInfo }