const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const e = require('express')
const EMAIL = process.argv[2]
const PASSWORD = process.argv[3]
if(!EMAIL || !PASSWORD) {
  throw new Error('Please enter your email and password!')
}

const app = express()
const port = 9000
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
})

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello from server send mail!'))

app.post('/send-mail', (req, res) => {
  let { to, subject, text, html } = req.body
  if(!to) {
    throw new Error(`Missing info 'to'!`)
  }
  if(!subject) {
    throw new Error(`Missing info 'subject'!`)
  }
  if(!text && !html) {
    throw new Error(`Missing info 'text' or 'html'!`)
  }

  mailTransport.sendMail({
    from: EMAIL,
    to,
    subject,
    text,
    html
  }, (err, info) => {
    if(err) {
      next(err)
    } else {
      res.json({ message: 'Success!', info })
    }
  })
})

app.use((err, req, res, next) => {
  let message = err.message
  let stack = err.stack
  res.status(500).json({ message, stack })
})

app.listen(port, (err) => console.log(err || `Server open at port ${port}`))