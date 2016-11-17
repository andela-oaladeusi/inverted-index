'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

/**
 * Sett up browserSync to our server directory,
 *  which our root directory in this case "src"
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
});

/**
 * Add watch function to be able to reload our browser
 *  whenever changes are been made to js, html, and css files
 */
gulp.task('watch', ['browserSync'], function (){
  // Reloads the browser whenever HTML or JS files change
  gulp.watch(['src/css/**/*.css','src/*.html','src/js/**/*.js','jasmine/spec/**/*.js'],browserSync.reload); 
});