const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

// The renderer can also include css and images. We don't need these for the main process
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})
rules.push({
  test: /\.(png|jpg)$/,
  loader: 'url-loader'
})

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    // Allowed file extensions
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
}
