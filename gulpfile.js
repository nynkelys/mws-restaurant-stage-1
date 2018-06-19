// In terminal: npm init in project folder
// In terminal: npm install --save-dev gulp
// In terminal: npm install --save-dev gulp-util
// In terminal: npm install --save-dev gulp-responsive


var gulp = require('gulp');
var responsive = require('gulp-responsive');

// Image task
// Compress
gulp.task('responsive', function() {
	return gulp.src('img/*')
		.pipe(responsive({
			'*.jpg':
			[
			{
				width: 200,
				quality: 50,
				rename: {
					suffix: '-200'
				}
			}, {
				width: 500,
				quality: 50,
				rename: {
					suffix: '-500'
				}
			}
			]
		}))
		.pipe(gulp.dest('img'));
});