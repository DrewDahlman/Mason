/*
  _   _               _      
 | | | |___ ___ _ __ (_)_ _  
 | |_| (_-</ -_) '  \| | ' \ 
  \___//__/\___|_|_|_|_|_||_|

 Concatenate, minify and cachebust the CSS and JS for the production ready version.

 NOTE: Concatenation groups, filenames, etc are defined in ./public/index.html.

*/

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css');

gulp.task('usemin', function() {
  gulp.src('public/*.html')
    .pipe(usemin({
      js: [uglify()],
      css: [minifycss()]
    }))
    .pipe(gulp.dest('examples/'));
});

