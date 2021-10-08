const User = require('../models/user')

const viewUsers = async (req, res) => {
    try {
        let users = await User.find({})
        return res.status(200).json({ success: true, users: users })
    }
    catch (err) {
        return res.status(404).json({ success: false, error: "Web carshed" })
    }
}

const banUser = async (req, res) => {
    try {
        await User.updateOne({ _id: req.body._id }, { $set: { freeze: true } })
        return res.status.json({ success: true })
    }
    catch (err) {
        return res.status(404).json({ success: false, error: "Web carshed" })
    }
}

const banUser = async (req, res) => {
    try {
        await User.updateOne({ _id: req.body._id }, { $set: { freeze: false } })
        return res.status.json({ success: true })
    }
    catch (err) {
        return res.status(404).json({ success: false, error: "Web carshed" })
    }
}