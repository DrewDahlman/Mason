var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css');

gulp.task('mason_dist', ['build'], function() {
  gulp.start('finish_dist');
});

