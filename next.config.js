const withCss = require('@zeit/next-css')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports = withCss({
  webpack: function (config, { isServer }) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }))
    }

    return config
  }
})