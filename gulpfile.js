var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat');

var env,
    jsSources,
    htmlSources,
    jsonSources,
    outputDir,

//env = process.env.NODE_ENV || 'development';
env = process.env.NODE_ENV || 'production';

if (env==='development') {
  outputDir = 'builds/development/';
} else {
  outputDir = 'builds/production/';
}


jsSources = ['src/components/scripts/app.js',
             'src/components/scripts/services/*.js',
             'src/components/scripts/controllers/*.js',
             'src/components/scripts/misc/*.js'];

htmlSources = ['src/*.html', 'src/components/**/*.html'];

cssSources = ['src/components/css/*.css'];

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
    .pipe(gulpif(env === 'production', minifyCSS({keepBreaks:true})))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(cssSources, ['css']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/components/images/**/*.*', ['images']);
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
  gulp.src('src/components/images/**/*.*')
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulp.dest(outputDir + 'images'))
    .pipe(connect.reload()) });

gulp.task('default', ['html', 'css', 'js', 'images', 'connect', 'watch']);
