var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat');

var env,
    jsSources,
    htmlSources,
    jsonSources,
    outputDir,

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/development/';
} else {
  outputDir = 'builds/production/';
}


jsSources = ['src/components/scripts/app.js',
             'src/components/scripts/services/*.js',
             'src/components/scripts/controllers/*.js'];
htmlSources = ['src/*.html', 'src/components/**/*.html'];

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('app.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('css', function() {
  gulp.src('src/components/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});
gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});

gulp.task('images', function() {
  gulp.src('builds/development/images/**/*.*')
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
    .pipe(connect.reload()) });

gulp.task('json', function() {
  gulp.src('builds/development/js/*.json')
    .pipe(gulpif(env === 'production', jsonminify()))
    .pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
    .pipe(connect.reload()) });

gulp.task('default', ['html', 'css', 'json', 'js', 'images', 'connect', 'watch']);
