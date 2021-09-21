function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();


    // if not logged in, redirect to login form
    return res.status(401)
}

module.exports = {
    isLoggedIn
}