var path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: './src/handler',
  target: 'node',
  module: {
    loaders: [
      {
        test:  /\.ts(x?)$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.d.ts', '.js']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  externals: {
    'aws-sdk': true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(process.env.ENV),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DYNAMO_ENV': JSON.stringify(process.env.DYNAMO_ENV)
      }
    })
  ]
}