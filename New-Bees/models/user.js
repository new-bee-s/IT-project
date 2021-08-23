const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    givenName: { type: String, require: true },
    familyName: { type: String, require: true },
    emailAddress: { type: String, require: true },
    password: { type: String, require: true },
    photo: {
        data: Buffer,
        contentType: String
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User