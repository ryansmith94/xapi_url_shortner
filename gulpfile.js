var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var merge = require('merge2');

var tsProject = ts.createProject('./tsconfig.json', {
  typescript: require('typescript')
});

gulp.task('default', ['browserify']);

gulp.task('ts-to-es5', function () {
  var tsResult = gulp.src(['src/**/*.tsx', 'src/**/*.ts', 'typings/main/**/*.d.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  var jsResult = tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));

  var dtsResult = tsResult.dts.pipe(gulp.dest('dist'));

  return merge([dtsResult, jsResult]);
});

gulp.task('browserify', ['ts-to-es5'], function () {
  return browserify('dist/client.js')
    .bundle()
    .pipe(source('client.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});