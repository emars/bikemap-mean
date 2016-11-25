const webpack = require('webpack')

const ENV = process.env.npm_lifecycle_event
const isProd = ENV === 'production'

function buildConfig () {
  // base webpack configuration
  const config = {
    entry: './src/app.js',
    output: {
      path: './dist',
      filename: 'main.bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: []
  }

  // environment specific config
  if (isProd) {
    config.devtool = 'source-map'
  } else {
    config.devtool = 'eval-source-map'
  }

  return config

}

module.exports = buildConfig()