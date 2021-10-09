const mongoose = require("mongoose")
const bcrypt = require('bcrypt-nodejs')

const adminSchema = new mongoose.Schema({
    adminAccount: { type: String, require: true },
    password: { type: String, require: true },
    preferredName: { type: String, require: true }
})

adminSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin