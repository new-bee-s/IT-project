const mongoose = require("mongoose")
const bcrypt = require('bcrypt-nodejs')

const adminSchema = new mongoose.Schema({
    adminAccount: { type: String, require: true },
    password: { type: String, require: true },
    preferredName: { type: String, require: true }
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin