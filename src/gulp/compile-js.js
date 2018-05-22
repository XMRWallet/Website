var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('compile-js', function() {
	return browserify('./src/js/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./out/website/js/'));
});

gulp.task('bundle-js', function(){
    return gulp.src(['./out/website/js/app.js', './src/js/monero.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./out/website/js/'));
});