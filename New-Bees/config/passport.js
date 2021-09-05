//require('dotenv').config()    // for JWT password key
// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require('passport-local').Strategy

// our user model
const User = require('../models/user')

// JSON Web Tokens
// const passportJWT = require("passport-jwt");
// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

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

    // for signup
    passport.use('local-signup', new LocalStrategy({
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
                        console.log("Customer signup failed:", email, "ALREADY REGISTERED!");
                        return done(null, false, req.flash('signupMessage', 'This email address is already taken.'));
                    }
                    else {
                        // otherwise
                        // create a new user
                        let newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.familyName = req.body.familyName;
                        newUser.givenName = req.body.givenName;

                        // and save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });

                        // put the user's email in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        req.session.user = newUser._id;
                        console.log('User signed up and logged in successfully:', email)
                    }
                });
            });
        }));

    // depending on what data you store in your token, setup a strategy
    // to verify that the token is valid. This strategy is used to check
    // that the client has a valid token
    // passport.use('jwt', new JwtStrategy({
    //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // client puts token in request header
    //     secretOrKey: process.env.PASSPORT_KEY, // the key that was used to sign the token
    //     passReqToCallback: true
    // }, (req, jwt_payload, done) => { // passport will but the decrypted token in jwt_payload variable
    //     User.findOne({ 'email': jwt_payload.body._id }, (err, user) => {
    //         if (err) {
    //             return done(err, false);
    //         }
    //         // if we found user, provide the user instance to passport
    //         if (user) {
    //             return done(null, user);
    //         } else { // otherwise assign false to indicate that authentication failed
    //             return done(null, false);
    //         }
    //     });
    // }));

    //Create a passport middleware to handle User login
    // EXERCISE: Write the signup strategy

    //Create a passport middleware to handle User login
    passport.use('login', new LocalStrategy({
        usernameField: 'email',     // get email and password
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            //Find the user associated with the email provided by the user
            await User.findOne({ 'email': email }, function (err, user) {
                // if user is not found or there are other errors
                if (err) {
                    return done(err, { message: "Database quest failed" });
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
                    req.session.user = user._id;
                    console.log('login successfully:', email)
                    return done(null, user);
                }
            });
        } catch (error) {
            return done(error);
        }
    }));

}