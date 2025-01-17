'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      contentScript: PATHS.src + '/contentScript.js',
      content: PATHS.src + '/content.css',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
