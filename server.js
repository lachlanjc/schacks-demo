const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const dataPath = '.data.tmp'

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://schacks-demo.glitch.me')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', false)
  next()
})

app.post('/message', (req, res) => {
  const dataStr = JSON.stringify(req.body.Body)
  console.log(req.body.From + ':' + ' ' + req.body.Body)
  fs.writeFile(dataPath, dataStr)
  res.end()
})

app.get('/color', (req, res) => {
  const dataStr = fs.readFileSync(dataPath).toString()
  res.send(JSON.parse(dataStr))
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
