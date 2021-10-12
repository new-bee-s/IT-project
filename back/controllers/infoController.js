const User = require('../models/user')
const fs = require('fs');
const path = require('path')
// Get the info from web and update the information if it is not empty
const editInfo = async (req, res) => {
    try {
        let userid = req.user._id
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

            let user = await User.findOne({ _id: userid })
            if (user.validPassword(password)) {
                return res.status(400).json({ success: false, error: "Same Password" })
            }
            else {
                await User.updateOne({ _id: userid }, { $set: { password: user.generateHash(password) } })
            }
        }
        if (introduction) {
            await User.updateOne({ _id: userid }, { $set: { introduction: introduction } })
        }
        if (userID) {
            let found = await User.findOne({ userID: userID })
            console.log(found)
            if (found) {
                return res.status(400).json({ success: false, error: "This UserID has been used" })
            }
            if (userID.length < 8) {
                return res.status(400).json({ success: false, error: "The ID should at least 8 digits" })
            }
            else if (userID.length > 16) {
                return res.status(400).json({ success: false, error: "The ID should less than 16 digits" })
            }
            else if (! /(?=.*[A-Z])(?=.*[a-z])(\d*)([-_]?)/.test(userID)) {
                return res.status(400).json({ success: false, error: "The ID does not satisfy the requirement" })
            }
            else {
                await User.updateOne({ _id: userid }, { $set: { userID: userID } })
            }

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
        console.log(err)
        return res.status(404).json({ success: false, error: "Website cracked" })
    }
}

const initInfo = async (req, res) => {
    try {
        let userid = req.user._id
        await User.updateOne({ _id: userid }, { $set: { gender: req.body.gender } })
        await User.updateOne({ _id: userid }, { $set: { mobile: req.body.mobile } })
        await User.updateOne({ _id: userid }, { $set: { region: req.body.region } })
        if (req.body.company) {
            await User.updateOne({ _id: userid }, { $set: { company: req.body.company } })
        }
        if (req.body.occupation) {
            await User.updateOne({ _id: userid }, { $set: { occupation: req.body.occupation } })
        }
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(404).json({ success: false, error: "Website cracked" })
    }
}

const uploadImage = async (req, res) => {
    try {
        let photo = {
            data: req.body.image,
            contentType: "image"
        }
        await User.updateOne({ _id: req.user._id }, { $set: { photo: photo } })
        return res.status(200).json({ success: true })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: "upload image error, failed" })
    }

}
module.exports = { editInfo, uploadImage, initInfo }