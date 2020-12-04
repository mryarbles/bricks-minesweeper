
const webpack = require('webpack')
const env = require('dotenv').config();

/*
This file configures react-app-rewired
to allow us to utilize babelrc and eslintrc
 */
const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin');
const { useBabelRc, override, useEslintRc, overrideDevServer, addBundleVisualizer, addWebpackAlias, addWebpackPlugin, watchAll } = require('customize-cra');

let webpackConfig;

console.log('config override ENV', env)

const devServer = overrideDevServer(
  watchAll()
)



// For production cloudfront handles content compression so don't compress with webpack.
// Dev is served by s3 and needs to be precompressed for test

const compressAssets = env.parsed.compressAssets;

if (compressAssets === 'true') {

  webpackConfig = override(
    useBabelRc(),
    // addBundleVisualizer(),
    useEslintRc(),
    addWebpackPlugin(new CompressionPlugin({
      test: /\.(js|css)(\?.&)?$/i,
      algorithm: 'gzip',
      filename(info) {
        return `${info.path}.gz${info.query}`;
      },
      deleteOriginalAssets: true
    })),
    addWebpackPlugin(new MomentLocalesPlugin())
  )
} else {
  webpackConfig = override(
    useBabelRc(),
    // addBundleVisualizer(),
    useEslintRc()
  )
}

module.exports = {
  webpack: webpackConfig,
  devServer
};
