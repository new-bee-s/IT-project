const mongoose = require("mongoose")
const bcrypt = require('bcrypt-nodejs')
const userSchema = new mongoose.Schema({
    givenName: { type: String, require: true },
    familyName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    photo: {
        data: Buffer,
        contentType: String
    },
    contact: [this],
    totalContact: { type: Number },
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }]

})

const User = mongoose.model('User', userSchema)
module.exports = User