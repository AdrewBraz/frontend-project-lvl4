// @ts-check

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const plugins = [ new MiniCssExtractPlugin(), new webpack.ProvidePlugin({
  process: 'process/browser',
}),];


if(isDevelopment){
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,  
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
          { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
        ],
      },
    ],
  },
};
