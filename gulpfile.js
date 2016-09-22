var gulp = require('gulp');
var csslint = require('gulp-csslint');
var cleanCSS = require('gulp-clean-css');
csslint.addFormatter('csslint-stylish');
var bs = require('browser-sync').create();
var $ = require('gulp-load-plugins')();

gulp.task('css', function() {
  gulp.src('css/style.css')
    .pipe(csslint({
      shorthand: false
    }))
    .pipe(csslint.formatter('stylish'));
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe($.plumber())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(bs.stream());
});

gulp.task('serve', function() {

  bs.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('js/*.js').on('change', bs.reload);
  gulp.watch('css/*.css', ['minify-css']);
  gulp.watch('./*.html').on('change', bs.reload);
});

gulp.task('browser-sync', function() {
  bs.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('default', ['css', 'minify-css', 'serve']);
