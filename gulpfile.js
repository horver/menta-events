const gulp = require('gulp');
const watch = require('gulp-watch');
const webpack = require('webpack-stream');

gulp.task('default', function() {
  return watch('src/**/*.*', function() {
    gulp.src('src/app.ts')
        .pipe(webpack(require('./webpack.config.js'), require('webpack')))
        .pipe(gulp.dest('dist/'));
  });
});