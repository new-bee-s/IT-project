const User = require('../models/user')
const Contact = require('../models/contact')
// Delete friend from contact list
const deleteFriend = async (req, res) => {
    try {
        // find the email in contact and pull it out
        await Contact.deleteOne({ _id: req.body.contactid })
        return res.status(200).json({ success: true })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: "delete failed, try again" })
    }
}

const acceptFriend = async (req, res) => {
    try {
        await Contact.updateOne({ user: req.body.userid, friend: req.params._id }, { $set: { status: "accepted" } })
        let contact = new Contact({
            user: req.params._id,
            friend: req.body.userid,
            status: 'accepted',
            tag: "",
            remark: ""
        })
        contact.save(err => {
            if (err) throw err
            return res.status(200).json({ success: true })
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: "accept failed, try again" })
    }
}

const getContact = async (req, res) => {
    try {
        let pendingList = await Contact.find({ friend: req.params._id, status: "pending" }, {}).populate('user')
        let acceptedList = await Contact.find({ user: req.params._id, status: "accepted" }, {}).populate('friend')
        return res.status(200).json({ success: true, pending: pendingList, accepted: acceptedList })
    } catch (err) { // error occors
        console.log(err)
        return res.status(400).json({ success: false, error: "Database query failed" })
    }
}

const changeRemark = async (req, res) => {
    try {
        await Contact.updateOne({ _id: req.body.contactid }, { $set: { remark: req.body.remark } })
    } catch { err } {
        return res.status(400).json({ success: false, error: "Database query failed" })
    }
}

const changeTag = async (req, res) => {

}
module.exports = { deleteFriend, acceptFriend, getContact, changeRemark }