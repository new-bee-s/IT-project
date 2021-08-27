const LocalStrategy = require('passport-local').Strategy;
//const cookieParser = require('cookie-parser');
// our user model
const User = require('../models/user')

module.exports = function (passport) {
    // these two functions are used by passport to store information
    // in and retrieve data from sessions. We are using user's object id
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (_id, done) {
        user.findById(_id, function (err, user) {
            done(err, user);
        });
    });


    // strategy to login user
    // this method only takes in username and password, and the field names
    // should match of those in the login form
    passport.use('user-login', new LocalStrategy({
        usernameField: 'emailAddress',
        passwordField: 'password',
        passReqToCallback: true
    }, // pass the req as the first arg to the callback for verification 
        function (req, emailAddress, password, done) {
            process.nextTick(function () {
                // see if the user with the emailAddress exists
                User.findOne({ 'emailAddress': emailAddress }, function (err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err) {
                        return done(err);
                    } else if (!user) {
                        console.log("user login failed:", emailAddress, "NOT FOUND")
                        return done(null, false, req.flash('loginMessage', 'Email address has not been registered.'));
                    } else if (!user.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        console.log("user login failed:", emailAddress, "WRONG PASSWORD");
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    // otherwise, we put the user's id in the session
                    else {
                        req.session.userId = user._id
                        console.log('user logged in successfully: ', req.session.userId)
                        return done(null, user);
                    }
                });
            });
        })
    );
}