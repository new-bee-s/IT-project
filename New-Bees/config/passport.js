require('dotenv').config()    // for JWT password key
// used to create our local strategy for authenticating
// using email and password
const LocalStrategy = require('passport-local').Strategy
// our user model
const User = require('../models/user')

// JSON Web Tokens
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (_id, done) {
        User.findById(_id, function (err, user) {
            done(err, user);
        });
    });

    // Setup a strategy
    // to verify that the token is valid. This strategy is used to check
    // that the client has a valid token
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // client puts token in request header
        secretOrKey: process.env.JWT_PASSWORD, // the key that was used to sign the token
        passReqToCallback: true
    }, (req, jwt_payload, done) => {
        // passport will but the decrypted token in jwt_payload variable
        User.findOne({ '_id': jwt_payload.body._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            // if we found user, provide the user instance to passport
            if (user && user.isLoggedIn && user._id == req.params._id) {
                return done(null, user);
            } else { // otherwise assign false to indicate that authentication failed
                return done(null, false);
            }
        });
    }));


    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, // pass the req as the first arg to the callback for verification 
        async (email, password, done) => {
            try {
                // see if the user with the emailAddress exists
                await User.findOne({ 'email': email }, function (err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err) {
                        return done(err, false, { message: "Database query failed" });
                    } else if (!user) {
                        return done(null, false, { message: 'Email not registered' });
                    } else if (!user.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, { message: 'Password incorrect' });
                    }
                    else {
                        return done(null, user);
                    }
                });
            } catch (err) {
                console.log(err)
                return done(err)
            };

        }));


    // for signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',     // get email and password
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            await User.findOne({ 'email': email }, function (err, existingUser) {
                // search a user by the email
                // if user is not found or exists, exit with false indicating
                // authentication failure
                if (err) {
                    return done(err, false, { message: "Database query failed" });
                } else {
                    if (email == "" || email == null) {
                        console.log("Please enter your email")
                        return done(null, false, { message: "Please enter your email" });
                    }
                    else if (req.body.givenName == "" || req.body.familyName == "" ||
                        req.body.givenName == null || req.body.familyName == null) {
                        return done(null, false, { message: "Please enter you name" });
                    }
                    else if (!/^[a-zA-Z]+$/.test(req.body.givenName) || !/^[a-zA-Z]+$/.test(req.body.familyName)) {
                        return done(null, false, { message: "Your name must be alphabet letters" });
                    }
                    else if (password == "" || password == null) {
                        return done(null, false, { message: "Please set your password" });
                    }
                    else if (req.body.confirmPassword == "" || req.body.confirmPassword == null) {
                        return done(null, false, { message: "Please enter your confirmed password" });
                    }
                    else if (existingUser) {
                        console.log("Customer signup failed:", email, "ALREADY REGISTERED!");
                        return done(null, false, { message: "Email has already Registered" });
                    }
                    else if (password != req.body.confirmPassword) {
                        return done(null, false, { message: "Please enter the same password" });
                    }
                    else if (password.length < 8) {
                        return done(null, false, { message: "Your password must be at least 8 characters" });
                    }
                    else {
                        // otherwise
                        // create a new user
                        let newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.familyName = req.body.familyName;
                        newUser.givenName = req.body.givenName;
                        newUser.contact = [];
                        newUser.groups = [];
                        newUser.introduction = "";
                        // and save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                }
            })
        } catch (err) {
            return done(err)
        }
    }));
}

