var browserify = require('browserify'),
    gulp = require('gulp'),
    handleErrors = require('../util/handleErrors'),
    source = require('vinyl-source-stream');

gulp.task('mason_dist', function() {
  // gulp.src([
  //   'tests/scripts/mason.js']
  // )
  // .pipe(gulp.dest('dist/'));

  // gulp.src([
  //   'tests/scripts/mason.min.js']
  // )
  // .pipe(gulp.dest('dist/'));
  return browserify({
    entries: ['./public/mason.js'],
    extensions: ['.js']
  })
  .bundle()
  .on('error', handleErrors)
  .pipe(source('mason.js'))
  .pipe(gulp.dest('./dist/'));
});

