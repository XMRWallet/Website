var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('./config').default;

module.exports.default = function () {
    connect.server({
        host      : '0.0.0.0',
        root      : config.buildDir,
        fallback  : config.buildDir + 'index.html',
        livereload: true,
        'livereload.hostname': '0.0.0.0'
    })
};
