require('dotenv').config()

const LocalStrategy = require('passport-local').Strategy

const Admin = require('../models/admin')

module.exports = function (passport) {
    passport.serializeUser(function (admin, done) {
        done(null, admin._id);
    });

    passport.deserializeUser(function (_id, done) {
        Admin.findById(_id, function (err, admin) {
            done(err, admin);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'account',
        passwordField: 'password',
    }, // pass the req as the first arg to the callback for verification 
        async (email, password, done) => {
            try {
                // see if the admin with the emailAddress exists
                await Admin.findOne({ 'account': email }, function (err, admin) {
                    // if there are errors, admin is not found or password
                    // does match, send back errors
                    if (err) {
                        return done(err, false, { message: "Database query failed" });
                    } else if (!admin) {
                        return done(null, false, { message: 'Account not registered' });
                    } else if (!admin.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, { message: 'Password incorrect' });
                    }
                    else {
                        return done(null, admin);
                    }
                });
            } catch (err) {
                console.log(err)
                return done(err)
            };

        }));
}