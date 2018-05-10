var gulp = require('gulp');
var svgo = require('gulp-svgo');
var compassImagehelper = require('gulp-compass-imagehelper');

gulp.task('compile-svg', function() {
	return gulp
		.src('src/svg/**/*.+(svg)')
		.pipe(svgo())
		.pipe(
			compassImagehelper({
				targetFile: '_sass-image.scss',
				includeData: true,
				css_path: 'src/scss/generate/',
				prefix: 'svg-',
			})
		)
		.pipe(gulp.dest('src/scss/generate/'));
});

gulp.task('watch-svg', function() {
	gulp.watch(['./src/svg/**/*'], ['compile-svg']);
});
