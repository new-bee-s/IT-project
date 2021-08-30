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
    }
})
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema)
module.exports = User