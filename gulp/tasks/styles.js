/*
  ___ _        _        
 / __| |_ _  _| |___ ___
 \__ \  _| || | / -_|_-<
 |___/\__|\_, |_\___/__/
          |__/          

 Compile all SASS in the ./src/styles directory, autoprefix it and save a
 non-minified version for the local webserver to ./public/css.

 No sourcemaps here (yet).

*/

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    handleErrors = require('../util/handleErrors');

gulp.task('styles', function() {
  return gulp.src('./src/styles/**/*.sass')
    .pipe(sass({'style': 'expanded'}))
    .on('error', handleErrors)
    .pipe(autoprefixer({
      'browsers': ['last 2 version', 'ff 17', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
      'cascade': false
    }))
    .pipe(gulp.dest('./public/css'));
});
