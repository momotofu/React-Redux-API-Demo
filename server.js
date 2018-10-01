const express = require('express'),
      promiseRouter = require('express-promise-router'),
      registerAPI = require('./api')

// set up express app
const router = promiseRouter()
const app = express()
  .use(router)
  .set('json spaces', 2)

registerAPI(router)

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500)
      .send(err.data || err.message || {})
  } else {
    next()
  }
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`React-redux demo app - Listening on port ${process.env.PORT || 9000}!`)
})
