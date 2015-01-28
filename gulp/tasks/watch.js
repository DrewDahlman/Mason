/*
 __      __    _      _    
 \ \    / /_ _| |_ __| |_  
  \ \/\/ / _` |  _/ _| ' \ 
   \_/\_/\__,_|\__\__|_||_|

 Watch CoffeeScript, SASS and ECO for changes and compile on the fly.

*/

var gulp = require('gulp');

gulp.task('watch', function(){
  gulp.watch('src/**/*.coffee', ['scripts']);
  gulp.watch('src/styles/**', ['styles']);
});
