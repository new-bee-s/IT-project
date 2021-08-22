const User = require('../models/user')
const addUser = async(req, res) => {
    let newUser = new User();
    newUser.givenName = req.body.givenName;
    newUser.familyName = req.body.familyName;
    newUser.emailAddress = req.body.emailAddress;
    newUser.password = req.body.password;
    newUser.save(function(err) {
        if (err) {
            throw err;
        }
        return done(null, newUser);
    })
}

module.exports = { addUser };