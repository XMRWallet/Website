var gulp = require('gulp');
var bump = require('gulp-bump');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');

function inc(importance) {
    return gulp.src('./package.json')
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'));
}

gulp.task('patch', function() { return inc('patch'); });
gulp.task('feature', function() { return inc('minor'); });
gulp.task('release', function() { return inc('major'); });

gulp.task('lint', function() {
    return gulp.src('./index.js')
        .pipe(jscs())
        .pipe(stylish());
});
