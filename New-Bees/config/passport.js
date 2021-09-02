
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
        User.findById(_id, function (err, user) {
            done(err, user);
        });
    });

    // strategy to login user
    // this method only takes in username and password, and the field names
    // should match of those in the login form
    passport.use('user-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, // pass the req as the first arg to the callback for verification 
        function (req, email, password, done) {
            process.nextTick(function () {
                // see if the user with the email exists
                User.findOne({ 'email': email }, function (err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err) {
                        return done(err);
                    } else if (!user) {
                        console.log("user login failed:", email, "NOT FOUND")
                        res.status(400).json({ success: false, error: "Email not found" })
                        return done(null, false, req.flash('loginMessage', 'Email address has not been registered.'));
                    } else if (!user.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        console.log("user login failed:", email, "WRONG PASSWORD");
                        res.status(409).json({ success: false, error: "Password incorrect" })
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    // otherwise, we put the user's id in the session
                    else {
                        req.session.userId = user._id
                        console.log('user logged in successfully: ', req.session.userId)
                        res.status(200).json({
                            success: true, user: {
                                id: user._id,
                                email: user.email,
                                firstName: user.firstName,
                                givenName: user.givenName
                            }
                        })
                        return done(null, user);
                    }
                });
            });
        })
    );

    passport.use('user-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, // pass the req as the first arg to the callback for verification 

        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({ 'email': email }, function (err, existingUser) {
                    // search a user by the username (email in our case)
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (existingUser) {
                        console.log("User signup failed:", email, "ALREADY REGISTERED!");
                        return done(null, false, req.flash('signupMessage', 'Email address is already registered.'));
                    } else {
                        // otherwise
                        // create a new user
                        let newUser = new User();
                        newUser.givenName = req.body.givenName;
                        newUser.familyName = req.body.familyName;
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.contact = [];
                        newUser.tags = [];
                        newUser.totalContact = 0;
                        // and save the user
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                        // put the user's ema  ilAddress in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        req.session.userId = newUser._id;
                        console.log("Customer signup successfully: ", email);
                        console.log("Customer logged in successfully: ", req.session.userId);
                    }
                });
            });
        })
    );
}