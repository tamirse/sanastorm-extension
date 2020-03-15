const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");

module.exports = {
  devtool: "cheap-module-source-map", // this avoids using eval (not allowed in extensions)
  entry: {
    contentScript: "./src/index.js",
    background: "./src/background.js",
    popup: "./src/components/Popup/popup.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ]
  },
  plugins: [
    new ExtensionReloader({
      reloadPage: true, // Force the reload of the page also
      entries: {
        // The entries used for the content/background scripts or extension pages
        contentScript: "contentScript",
        background: "background",
        extensionPage: "popup"
      }
    })
  ]
};
