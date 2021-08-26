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

// // if in the production, server static assets
// if (process.env.NODE_ENV === 'production') {
//     // set static folder for it
//     app.use(express.static('front'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'front', 'index.html'))
//     })
// }

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

module.exports = app;