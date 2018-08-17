const path = require('path').resolve(__dirname, 'dist')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'index.js',
        path: path
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    query: {
                      cacheDirectory: true,
                      plugins: [
                        [
                          'babel-plugin-transform-object-rest-spread',
                          {
                            useBuiltIns: true // we polyfill Object.assign in src/normalize.js
                          },
                        ],
                      ],
                      presets: [
                        'babel-preset-react',
                        ['babel-preset-env', {
                          modules: false,
                          targets: {
                            ie9: true,
                          },
                          uglify: true,
                        }],
                      ]
                    }
                }
            },            
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader" 
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    mode: 'development'
};