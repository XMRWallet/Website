var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var server = require('./src/gulp/server').default;

require('./src/gulp/compile-css');
require('./src/gulp/compile-svg');
require('./src/gulp/compile-template');
require('./src/gulp/compile-js');

gulp.task('watch', function() {
	runSequence(
		['clean-css', 'compile-js'],
		['compile-svg', 'compile-template'],
		['compile-css'],
		['watch-svg', 'watch-css', 'watch-template']
	);
});

gulp.task('server', function() {
	runSequence(
		['clean-css', 'compile-js'],
		['compile-svg', 'compile-template'],
		['compile-css'],
		['watch-svg', 'watch-css', 'watch-template']
	);

	server();
});

gulp.task('build', function() {
	runSequence(
		['clean-css', 'compile-js'],
		['compile-svg', 'compile-template'],
		['compile-css'],
        ['bundle-js']
	);
});
