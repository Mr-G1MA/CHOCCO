const {src , dest, task, series, watch} = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

sass.compiler = require('node-sass');

const files = [
  'dist/*.css',
  'dist/*.html',
  'dist/*.js'
];

task( 'clean', () => {
  return src( files, { read: false })
    .pipe( clean() );
});

task('copy:html', () => {
  return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
 });

const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/css/main.scss'
 ];

 task('styles', () => {
  return src(styles)
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
 });

 task('scripts', () => {
  return src('src/JS/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
 });

 task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
 });

 watch('./src/css/**/*.scss', series('styles'));
 watch('./src/*.html', series('copy:html'));
 watch('./src/JS/*.js', series('scripts'));

 task('default', series('clean', 'copy:html', 'styles', 'scripts', 'server'));