const withCss = require('@zeit/next-css')
const { IgnorePlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

module.exports = withCss({
  webpack: (config, { isServer }) => {
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./client/polyfills.js')
      ) {
        entries['main.js'].unshift('./client/polyfills.js')
      }

      return entries
    }

    config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/))

    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerPort: isServer ? 8888 : 8889,
        }),
      )
    }

    return config
  },
})
