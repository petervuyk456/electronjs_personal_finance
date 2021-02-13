const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Webpack plugins
module.exports = [
  // Separates Typescript type checking and linting into 2 separate processes for better compile performance
  new ForkTsCheckerWebpackPlugin()
];
