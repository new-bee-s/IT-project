const mongoose = require("mongoose")
const bcrypt = require('bcrypt-nodejs')
const { nanoid } = require('nanoid')

const contactSchema = new mongoose.Schema({
    email: { type: String, require: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"] },
    tag: { String },
    remark: { String }
})

const groupSchema = new mongoose.Schema({
    groupName: { type: String, require: true },
    groupMember: [contactSchema]
})

const userSchema = new mongoose.Schema({
    userID: { type: String, require: true, default: () => nanoid(10) },
    givenName: { type: String, require: true },
    familyName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    photo: {
        data: Buffer,
        contentType: String
    },
    gender: { type: String, enum: ["Male", "Female", "Prefer not to say"] },
    contact: { type: [contactSchema] },
    groups: [groupSchema],
    introduction: { String }
})

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema)
const Contact = mongoose.model('Contact', contactSchema)
module.exports = User, Contact