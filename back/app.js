//Import mpdule
const express = require('express')
const db = require('./db')

const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
//app.use(module)
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false })) // replaces body-parser
app.use(express.static('public'))
app.use(cookieParser())
let allowedOrigins = ['http://localhost:3000', 'https://new-bees.netlify.app/'];

app.use(cors({
    credentials: true, // add Access-Control-Allow-Credentials to header
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(session({
    secret: "a secret",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())

app.use(passport.session())


// Routers
const userRouter = require('./routes/userRouter')
const contactRouter = require('./routes/contactRouter')
const infoRouter = require('./routes/infoRouter')
const searchRouter = require('./routes/searchRouter')
// Use Routers
app.use('/', userRouter)
app.use('/dashboard/', contactRouter)
app.use('/dashboard/', infoRouter)
app.use('/dashboard/', searchRouter)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

module.exports = app;