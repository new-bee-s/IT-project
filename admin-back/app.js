const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false })) // replaces body-parser




const port = process.env.PORT || 8001
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})