require('dotenv').config()

const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
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
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // client puts token in request header
        secretOrKey: process.env.JWT_PASSWORD, // the key that was used to sign the token
        passReqToCallback: true
    }, (req, jwt_payload, done) => {
        // passport will but the decrypted token in jwt_payload variable
        Admin.findOne({ '_id': jwt_payload.body._id }, (err, user) => {
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


    passport.use('local-login', new LocalStrategy({
        usernameField: 'account',
        passwordField: 'password',
    }, // pass the req as the first arg to the callback for verification 
        async (account, password, done) => {
            try {
                // see if the admin with the accountAddress exists
                await Admin.findOne({ 'account': account }, function (err, admin) {
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


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'account',     // get account and password
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, account, password, done) => {
        try {
            await Admin.findOne({ 'account': account }, function (err, existingAdmin) {
                // search a user by the account
                // if user is not found or exists, exit with false indicating
                // authentication failure
                if (err) {
                    return done(err, false, { message: "Database query failed" });
                } else {
                    if (account == "" || account == null) {
                        console.log("Please enter your account")
                        return done(null, false, { message: "Please enter your account" });
                    }
                    else if (req.body.name == "" || req.body.name == null) {
                        console.log("Please enter your name")
                        return done(null, false, { message: "Please enter your name" });
                    }
                    else if (!/^[a-zA-Z]+$/.test(account)) {
                        return done(null, false, { message: "Your account must be alphabet letters" });
                    }
                    else if (password == "" || password == null) {
                        return done(null, false, { message: "Please set your password" });
                    }
                    else if (req.body.confirmPassword == "" || req.body.confirmPassword == null) {
                        return done(null, false, { message: "Please enter your confirmed password" });
                    }
                    else if (existingAdmin) {
                        console.log("Admin signup failed:", account, "ALREADY REGISTERED!");
                        return done(null, false, { message: "Admin has already Registered" });
                    }
                    else if (password != req.body.confirmPassword) {
                        return done(null, false, { message: "Please enter the same password" });
                    }
                    else if (password.length < 8) {
                        return done(null, false, { message: "Your password must be at least 8 characters" });
                    }
                    else if (!/^[0-9a-zA-Z]+$/.test(account)) {
                        return done(null, false, { message: "Your password does not satisfy the requirement" });
                    }

                    else {
                        // otherwise
                        // create a new user
                        let newAdmin = new Admin();
                        newAdmin.account = account
                        newAdmin.password = password
                        newAdmin.name = req.body.name
                        // and save the user
                        newAdmin.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newAdmin);
                        })
                    }
                }
            })
        } catch (err) {
            return done(err)
        }
    }));
}