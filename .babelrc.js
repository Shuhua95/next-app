const prod = process.env.NODE_ENV === "production"

module.exports = {
  "presets": [
    [
      "next/babel",
      {
        "preset-env": {
          "useBuiltIns": "usage"
        }
      }
    ]
  ],
  "plugins": [
    [
      "transform-define",
      { "process.env.BACKEND_URL": prod ? "https://niiker.com/api" : "https://niiker.com/api" }
    ],
    "transform-decorators-legacy",
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ],
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}