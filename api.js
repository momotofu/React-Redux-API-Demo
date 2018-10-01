const path = require('path')
const fs = require('fs')

/**
 * routes
 */
module.exports = router => {
  router.get('/assets/js/:filename', async (req, res) => {
    console.log('path: ', path.resolve(__dirname, `dist/${req.params.filename}`))
    fs.readdir(__dirname, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    })
    res.sendFile(path.resolve(__dirname, `dist/${req.params.filename}`))
  })

  router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.sendFile(path.resolve(__dirname, 'index.html'))
  })
}
