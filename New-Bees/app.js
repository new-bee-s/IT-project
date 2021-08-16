const express = require('express')
const app = express();

app.get('/', (req, res) => {
    console.log('<h1>ththt</h1>')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

module.exports = app;