/*
  ___                  
 / __| ___ _ ___ _____ 
 \__ \/ -_) '_\ V / -_)
 |___/\___|_|  \_/\___|

 You just got served. By a webserver. Because that's what they do ... 

*/

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    config = require('../config');

gulp.task('serve', function() {
  gulp.src(config.root)
    .pipe(webserver({
      'fallback': 'index.html',  // Set for single page app style
      'livereload': true,        // Reload 'er on the fly?
      'open': true,              // Open the default browser when this task is run?
      'port': config.port        // Set a custom port
    }));
});
