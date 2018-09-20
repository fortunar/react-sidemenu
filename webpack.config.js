const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "demo/index.html"),
    filename: "./index.html"
});
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
    
    const devMode = !env || !env.production;

    return {
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
                    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    }, {
                    loader: 'css-loader'
                    }, {
                    loader: 'less-loader'
                    }]
                }
            ]
        },
        plugins: [
            htmlWebpackPlugin,
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
            })
        ],
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
    }
};