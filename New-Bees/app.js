const express = require('express')
const cors = require('cors')
const db = require('./db')
const path = require('path')
const User = require('./models/user')
const userRouter = require('./routes/userRouter')
const bodyParser = require('body-parser')
const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))


app.use('/', userRouter)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/login.html")
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

module.exports = app;