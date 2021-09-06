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

    // for signup
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',     // get email and password
        passwordField: 'password'
    },
        async (email, password, done) => {
            console.log('2')
            try {
                await User.findOne({ 'email': email }, function (err, existingUser) {
                    // search a user by the email
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        return done(err, false, { message: "Database query failed" });
                    }
                    if (existingUser) {
                        console.log("Customer signup failed:", email, "ALREADY REGISTERED!");
                        return done(null, false, { message: "Email has already Registered" });
                    }
                    if (email == "" || email == null) {
                        console.log("Please enter your email")
                        return done(null, false, { message: "Please enter your email" });
                    }
                    else if (req.body.givenName == "" || req.body.familyName == "" ||
                        req.body.givenName == null || req.body.familyName == null) {
                        return done(null, false, { message: "Please enter you name " });
                    }
                    else if (password == "" || password == null) {
                        return done(null, false, { message: "Please set your password" });
                    }
                    else if (req.body.confirmPassword == "" || req.body.confirmPassword == null) {
                        return done(null, false, { message: "Please enter your confirmed password" });
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
                        newUser.totalContact = 0;
                        newUser.tags = [];

                        // and save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });

                        // communications between the client (browser) and the FoodBuddy app
                        console.log('User signed up and logged in successfully:', email)
                    }
                })
            } catch (err) {
                return done(err)
            }
        }));


    // Setup a strategy
    // to verify that the token is valid. This strategy is used to check
    // that the client has a valid token
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // client puts token in request header
        secretOrKey: process.env.JWT_PASSWORD, // the key that was used to sign the token
        passReqToCallback: true
    }, (jwt_payload, done) => { // passport will but the decrypted token in jwt_payload variable
        User.findOne({ 'email': jwt_payload.body._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            // if we found user, provide the user instance to passport
            if (user) {
                return done(null, user);
            } else { // otherwise assign false to indicate that authentication failed
                return done(null, false);
            }
        });
    }));

    //Create a passport middleware to handle User login
    passport.use('login', new LocalStrategy({
        usernameField: 'email',     // get email and password
        passwordField: 'password'
    }, async (email, password, done) => {
        console.log('1')
        try {
            //Find the user associated with the email provided by the user
            await User.findOne({ 'email': email }, function (err, user) {
                // if user is not found or there are other errors
                if (err) {
                    return done(err, false, { message: "Database query failed" });
                }
                if (!user) {
                    console.log(email, ' not registered');
                    return done(null, false, { message: 'Email not registered' });
                }
                // user is found but the password doesn't match
                if (!user.validPassword(password)) {
                    console.log('password incorrect:', email);
                    return done(null, false, { message: 'Password incorrect' });
                }
                // everything is fine, provide user instance to passport
                else {
                    console.log('login successfully:', email)
                    return done(null, user);
                }
            });
        } catch (error) {
            return done(error);
        }
    }));

}