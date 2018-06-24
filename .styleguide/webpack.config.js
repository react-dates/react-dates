const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ["airbnb"]
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ["airbnb"]
            }
          }
        ],
        include: [path.resolve(__dirname, "..", "src")]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
