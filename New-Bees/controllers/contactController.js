const { User } = require('../models/user')

// Delete friend from contact list
const deleteFriend = async (req, res) => {
    try {
        // find the email in contact and pull it out
        await User.updateOne({ _id: req.body.id }, { $pull: { contact: { email: req.body.email } } })
        return res.status(200).json({ success: true })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: "delete failed, try again" })
    }

}

module.exports = { deleteFriend }