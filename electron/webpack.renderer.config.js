var path = require('path');
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
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    // Add import aliases. Also add these to tsconfig to prevent linter errors
    alias: {
      assets: path.resolve(__dirname, 'src/renderer/assets'),
      components: path.resolve(__dirname, 'src/renderer/components'),
      styles: path.resolve(__dirname, 'src/renderer/styles'),
      hooks: path.resolve(__dirname, 'src/renderer/hooks'),
      renderer: path.resolve(__dirname, 'src/renderer'),
      rendererUtils: path.resolve(__dirname, 'src/renderer/utils'),
      shared: path.resolve(__dirname, 'src/shared'),
      sharedUtils: path.resolve(__dirname, 'src/shared/utils'),
    },
  },
}
