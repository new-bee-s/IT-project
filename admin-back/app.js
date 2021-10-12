const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false })) // replaces body-parser

let allowedOrigins = ['http://localhost:3001', 'https://new-bees-admin.netlify.app'];
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
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())

app.use(passport.session())


const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')

app.use('/dashboard', userRouter)
app.use('/', adminRouter)

const port = process.env.PORT || 8001
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})