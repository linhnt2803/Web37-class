require('./connect-mongo')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const routes = require('./routes')
const { readTokenMiddleware } = require('./modules/auth')

const app = express()
const port = process.env.PORT || 9000

app.use(bodyParser.json())
app.use(session({
  secret: 'my secret string',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 12 * 60 * 60 } // 12hs
}))
app.use(readTokenMiddleware)

// app.get(
//   '/not-require-token',
//   (req, res) => res.send('Success!')
// )

// app.get(
//   '/require-token',
//   authenticatedMiddleware,
//   (req, res) => res.send('Success!')
// )

app.use(routes)

app.use((err, req, res, next) => {
  res.status(500)
    .json({
      message: err.message,
      stack: err.stack
    })
})

app.listen(port, (err) => {
  console.log(err || `Server opend at port '${port}'`)
})