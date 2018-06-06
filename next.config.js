const withCss = require('@zeit/next-css')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports = withCss({
  webpack: function (config, { isServer, dev }) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true
      }))
    }

    if (!dev) {
      // Unshift polyfills in main entrypoint.
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js']) {
          entries['main.js'].unshift('./polyfills.js');
        }
        return entries;
      }
    }

    return config
  }
})