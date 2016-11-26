'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

/**
 * Setup browserSync to our server directory,
 *  which our directory in this case is "src"
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
      port: process.env.PORT || 5000,
      open: false
  });
});

/**
 * Add watch function to be able to reload our browser
 *  whenever changes are been made to js, html, and css files
 */
gulp.task('watch', ['browserSync'], function (){
  // Reloads the browser whenever HTML, CSS or JS files change
  gulp.watch(['src/css/**/*.css','src/*.html','src/js/**/*.js','jasmine/spec/**/*.js'],browserSync.reload); 

});

gulp.task('default', ['watch']);