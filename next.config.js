const withCss = require('@zeit/next-css')
const { IgnorePlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports = withCss({
  webpack: function (config, { isServer }) {

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
        entries['main.js'].unshift('./client/polyfills.js')
      }

      return entries
    }

    config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/))

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: isServer ? 8888 : 8889
      }))
    }

    return config
  }
})