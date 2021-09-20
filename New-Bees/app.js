//Import mpdule
const express = require('express')
const db = require('./db')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')

const session = require('express-session')
const flash = require('connect-flash-plus')
const cookieParser = require('cookie-parser')
//app.use(module)
app.use(express.json())
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use(session({
    secret: "a secret",
    resave: true,
    saveUninitialized: true
}))


app.use(flash())

// Routers
const userRouter = require('./routes/userRouter')
const contactRouter = require('./routes/contactRouter')
const infoRouter = require('./routes/infoRouter')
// Use Routers
app.use('/', userRouter)
app.use('/dashboard/', contactRouter)
app.use('/dashboard/information', infoRouter)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

module.exports = app;