var browserify = require('browserify'),
    gulp = require('gulp'),
    handleErrors = require('../util/handleErrors'),
    source = require('vinyl-source-stream');

gulp.task('mason', function() {
  return browserify({
      entries: ['./src/mason.coffee'],
      extensions: ['.coffee']
    })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('mason.js'))
    .pipe(gulp.dest('./public/js'));
});

