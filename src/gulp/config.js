var util = require('gulp-util');

var isProduction = !!util.env.production;

const config = {
  buildDir: '../Library/website/',
  production: isProduction,
  css: {
    src: 'src/scss/style.scss',
    dest: 'css'
  },
};

module.exports.default = config;
