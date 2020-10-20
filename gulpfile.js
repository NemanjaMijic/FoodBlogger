var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-terser');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('uglify', function() {
  return gulp.src('scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})



gulp.task('css', function () {
  return gulp.src('./css/*.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist'));
});

  gulp.task('run', gulp.series('sass','css'));
  gulp.task('watch', function() {
    return gulp.watch('./sass/*.scss', gulp.series('sass')),
    gulp.watch('./css/*.css', gulp.series('css')),
    gulp.watch('./scripts/*.js', gulp.series('uglify'));
  });

 gulp.task('default',gulp.series('run','watch'));



  