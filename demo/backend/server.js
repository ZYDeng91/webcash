import express from 'express'
import bodyParser from 'body-parser'
import { checkStamp } from './validator.js'

const app = express()

app.use(bodyParser.json())

app.post('/send', (req, res) => {
  const stamp = req.body.pow
  const email = req.body.email
  res.send(checkStamp(stamp, email, 20, 2*24*3600*1000))
})

app.listen(3000)
console.log("listening on port 3000")
