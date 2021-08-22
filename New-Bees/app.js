const express = require('express')
const app = express();
const cors = require('cors')
const db = require('./db')
const path = require('path')

app.get('/', (req, res) => {
    console.log('<h1>ththt</h1>')
})
const userRouter = require('./routes/userRouter')
app.use('/user', userRouter)
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

module.exports = app;