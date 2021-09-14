const User = require('../models/user')
const UserCon = mongoose.model("user")

// Delete friend from contact list
const deleteFriend = async (req, res) => {
    try {
        // find the email in contact and pull it out
        await User.updateOne({ _id: req.body.data }, { $pull: { contact: req.body.email } })
        return res.status(200).json({ success: true })
    }
    catch (err) {
        return res.status(400).json({ success: false, error: "delete failed, try again" })
    }

}

const getContact = async (req, res) => {
	try {
        const contactList = await User.findOne({ _id: req.params._id },{ contact: true, _id: false })
		if (contactList === null) { // no contact found in database
			res.status(404).json({success: false, error: "Please add one friend first!"})
		}
		return res.status(200).json({success: true, contactList}) // contact was found
	} catch (err) { // error occors
		res.status(400).json({success: false, error: "Database query failed"})
	}
}


module.exports = { deleteFriend , getContact}

