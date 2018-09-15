const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "demo/index.html"),
    filename: "./index.html"
});
module.exports = {
    entry: path.join(__dirname, "demo/index.js"),
    output: {
      path: path.join(__dirname, "demo/dist"),
      filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [{
                  loader: 'style-loader'
                }, {
                  loader: 'css-loader'
                }, {
                  loader: 'less-loader'
                }]
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [
          path.resolve('./node_modules'),
          path.resolve('.')
        ]
    },
    devServer: {
        port: 3000
    }
};