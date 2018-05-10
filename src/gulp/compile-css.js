var gulp = require('gulp');
var util = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var del = require('del');
var connect = require('gulp-connect');

var config = require('./config').default;

gulp.task('clean-css', function() {
	return del([config.buildDir + config.css.dest + '*.css']);
});

gulp.task('compile-css', function () {
    return gulp.src(config.css.src)
        .pipe(!config.production ? sourcemaps.init() : util.noop())
        .pipe(sass({outputStyle: (config.production ? 'compressed' : null)}).on('error', sass.logError))
        .pipe(!config.production ? sourcemaps.write() : util.noop())
        .pipe(gulp.dest(config.buildDir + config.css.dest))
        .pipe(config.production ? gulp.dest(config.buildDir + config.css.dest) : util.noop())
        .pipe(!config.production ? connect.reload() : util.noop())
});

gulp.task('watch-css', function () {
    gulp.watch(['./src/scss/**/*.scss'], ['compile-css'])
});