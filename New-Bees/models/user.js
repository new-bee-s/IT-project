const mongoose = require("mongoose")
const bcrypt = require('bcrypt-nodejs')
const userSchema = new mongoose.Schema({
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: {
        data: Buffer,
        contentType: String
    }
})

const user = userSchema = mongoose.model('user', userSchema)
module.exports = user