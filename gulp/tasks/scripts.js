/*
  ___         _      _      
 / __| __ _ _(_)_ __| |_ ___
 \__ \/ _| '_| | '_ \  _(_-<
 |___/\__|_| |_| .__/\__/__/
               |_|          

 Compile all CoffeeScript in the ./src directory, bundle it and save a
 non-minified version for the local webserver to ./public/js.

 No sourcemaps here (yet).

*/

var browserify = require('browserify'),
    gulp = require('gulp'),
    handleErrors = require('../util/handleErrors'),
    source = require('vinyl-source-stream');

gulp.task('scripts', function() {
  browserify({
      entries: ['./src/app.coffee'],
      extensions: ['.coffee']
    })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js'));

  browserify({
      entries: ['./src/mason.coffee'],
      extensions: ['.coffee']
    })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('mason.js'))
    .pipe(gulp.dest('./public/js'));

});
