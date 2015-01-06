/*
  ___      _ _    _ 
 | _ )_  _(_) |__| |
 | _ \ || | | / _` |
 |___/\_,_|_|_\__,_|

 Build the production ready version of the app in the ./dist folder.

*/

var gulp = require('gulp');

gulp.task('build',['copy', 'scripts', 'styles'], function() {
  gulp.start('usemin');
});