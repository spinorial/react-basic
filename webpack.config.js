const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'public/scripts'),
    filename: 'bundle.js'
  },
	module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    },
    {
      loader: 'babel-loader',
      test: /\.jsx$/,
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
     {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  }
};
