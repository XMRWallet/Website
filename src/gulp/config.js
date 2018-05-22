var util = require('gulp-util');

var isProduction = !!util.env.production;

const config = {
  buildDir: './out/website/',
  production: isProduction,
  css: {
    src: 'src/scss/style.scss',
    dest: 'css'
  },
};

module.exports.default = config;
