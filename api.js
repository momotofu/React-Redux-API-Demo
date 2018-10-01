const path = require('path')

/**
 * routes
 */
module.exports = router => {
  router.get('/assets/js/:filename', async (req, res) => {
    console.log('path: ', path.resolve(__dirname, `dist/${req.params.filename}`))
    res.sendFile(path.resolve(__dirname, `dist/${req.params.filename}`))
  })

  router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.sendFile(path.resolve(__dirname, 'index.html'))
  })
}
