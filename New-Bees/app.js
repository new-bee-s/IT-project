//Import mpdule
const express = require('express')
const db = require('./db')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash-plus')

//app.use(module)
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))

app.use(cors({
    credentals: true,
    origin: "http://localhost:3000"
}))

app.use(session({
    secret: "a secret",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(flash())


const userRouter = require('./routes/userRouter')

app.use('/', userRouter)
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

module.exports = app;