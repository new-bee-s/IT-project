// customerController will be written on next 
const User = require('../models/user')
const Tag = require('../models/tags')
const users = async (req, res) => {
    let users = await User.find({}, { givenName: true });
    if (users) {
        return res.send(users)
    }
}

module.exports = { users }

