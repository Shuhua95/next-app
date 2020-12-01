const prod = process.env.NODE_ENV === "production"

module.exports = {
  "presets": [
    [
      "next/babel",
      {
        "@babel/preset-env": {
          "useBuiltIns": "usage",
          "corejs": "3"
        },
      }
    ]
  ],
  "plugins": [
    [
      "transform-define",
      { "process.env.BACKEND_URL": prod ? "https://niiker.com/api" : "https://niiker.com/api" }
    ],
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        "style": "css"
      }
    ],
    [
      "import",
      {
        "libraryName": "@ant-design/icons",
        "libraryDirectory": "lib/icons",
        "camel2DashComponentName": false
      },
      "@ant-design/icons"
    ],
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": prod ? true : false,
      }
    ]
  ]
}