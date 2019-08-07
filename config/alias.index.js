const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    }
  }
};

//只为给webstrom指定webpack
