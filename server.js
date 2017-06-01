const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Clone!')
})

app.get('/v1/test', function (req, res) {
  res.send('Hello Clone!')
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
