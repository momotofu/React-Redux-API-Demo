require('../root-styles/index.styl')

if (process.env.NODE_ENV === 'production')
  module.exports = require('./options/root.prod')
else
  module.exports = require('./options/root.dev')