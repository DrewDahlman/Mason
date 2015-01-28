/*
  ___  _    _   
 |   \(_)__| |_ 
 | |) | (_-<  _|
 |___/|_/__/\__|

 This cool task exists so that build can run when clean is finished.

*/

var gulp = require('gulp');

gulp.task('dist', ['clean'], function() {
  gulp.start('mason_dist');
});