const path = require("path");

console.log(path.resolve("src/styleguide/Wrapper"));

module.exports = {
  webpackConfig: require("./webpack.config.js"),
  ignore: ["node_modules/**/*.js?"],
  styleguideComponents: {
    Wrapper: path.resolve("src/styleguide/Wrapper")
  },
  styles: {
    StyleGuide: {
      "@global html": {
        boxSizing: "border-box",
        fontFamily: "Helvetica, sans-serif",
        fontSize: "14px"
      },
      "@global *, *:before, *:after": {
        boxSizing: "inherit"
      },
      "@global a": {
        color: "#008489",
        fontWeight: "bold"
      }
    }
  },

  sections: [
    {
      name: "UI Components",
      content: "../docs/ui.md",
      components: "../src/**/*.jsx"
    }
  ]
};
