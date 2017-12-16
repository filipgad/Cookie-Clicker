const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ["./src/jsx/main.jsx","./src/scss/main.scss"],
    output: { filename: "./dist/js/out.js" },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3002
    },
    watch: true,

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2', 'react'] }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?url=false', 'sass-loader']
                })

            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: './dist/imagessrc/images'}
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./dist/css/style.css')

    ]
};
