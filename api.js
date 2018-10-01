const path = require('path')
const fs = require('fs')

/**
 * routes
 */
module.exports = router => {
  router.get('/assets/js/:filename', async (req, res) => {
    res.sendFile(path.resolve(__dirname, `dist/${req.params.filename}`))
  })

  router.get('/dist/:filename', async (req, res) => {
    res.sendFile(path.resolve(__dirname, `dist/${req.params.filename}`))
  })

  router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.sendFile(path.resolve(__dirname, 'index.html'))
  })
}
