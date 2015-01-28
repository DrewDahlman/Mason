var gulp = require('gulp');

gulp.task('finish_dist', function() {
  gulp.src('examples/scripts/mason.min.js')
    .pipe(gulp.dest('dist/'));
  gulp.src('public/js/mason.js')
    .pipe(gulp.dest('dist/'));
  gulp.start('clean_dist');
});

