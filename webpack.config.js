const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const rulesForCss = {
  test: /\.(s[ac]|c)ss$/i,
  exclude: /node_modules/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
}

const rulesForFiles = {
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
};


const rulesForJs = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
};

const rulesForHtml = {
  test: /\.html$/i,
  loader: "html-loader",
}


const rules = [rulesForCss, rulesForJs, rulesForFiles, rulesForHtml];

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wepack App',
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    open: true,
    port: 3000,
    compress: true, // enable gzip compression
    client: {
      overlay: { // show errors in browser
        errors: true,
        warnings: false,
      },
    },
  }
};
