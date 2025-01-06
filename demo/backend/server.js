import express from 'express'
import bodyParser from 'body-parser'
import { createHash } from 'crypto'

const app = express()

app.use(bodyParser.json())

function check(stamp, resource, difficulty, expiration) {
  const [ver, bits, date, res, ext, rand, counter, _] = stamp.split(":")
  if (ver !== "1") {
    return "only hashcash v1 is supported"
  }
  if (!counter || _ !== undefined) {
    return "malformed stamp"
  }
  if (expiry(date, expiration)) {
    return "expired stamp"
  }
  if (parseInt(bits) < difficulty || resource !== res || !hash32(stamp, difficulty)) {
    return "invalid stamp"
  }
  return "ok"
}

function hash32(stamp, bits) {
  const sha1sum = createHash('sha1')
  sha1sum.update(stamp)
  const hashed = sha1sum.digest('hex')
  const hashed32 = parseInt(hashed.slice(0, 8), 16)
  return Math.clz32(hashed32) >= bits
}

function expiry(date, expiration) {
  const now = Date.now()
  const datestr = `20${date.slice(0,2)}/${date.slice(2,4)}/${date.slice(4,6)}`
  const d = Date.parse(datestr)
  return isNaN(d) || d > now || d < now - expiration
}

app.post('/send', (req, res) => {
  const stamp = req.body.pow
  const email = req.body.email
  res.send(check(stamp, email, 20, 2*24*3600*1000)) })

app.listen(3000)
console.log("listening on port 3000")
