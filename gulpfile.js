const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const changed = require('gulp-changed')
const watch = require('gulp-watch')
const plumber = require('gulp-plumber')
const less = require('gulp-less')
const eslint = require('gulp-eslint')

const babelConfig = {
  'plugins': [
    'transform-class-properties',
    'transform-runtime'
  ],
  'presets': [
    'es2015',
    'stage-0',
    'react',
    'es2015-loose'
  ]
}

const end = () => ({
  errorHandler: function (err) {
    console.error(err)
    this.emit('end')
  }
})

gulp.task('lint', function () {
  return gulp.src([ 'src/**/*.js', 'src/**/*.jsx' ])
    .pipe(changed('lib', { extension: '.js' }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})


gulp.task('babel', () => {
  return gulp.src([ 'src/javascript/**/*.js', 'src/javascript/**/*.jsx' ])
    .pipe(plumber())
    .pipe(changed('lib', { extension: '.js' }))
    .pipe(babel(babelConfig))
    .pipe(gulp.dest('lib'))
})

gulp.task('copy-files', () => {
  return gulp.src([ './demo/src/example.json', './demo/src/index.html' ])
    .pipe(plumber())
    .pipe(gulp.dest('./demo/dist'))
})

gulp.task('dev-less', () => {
  return gulp.src('./demo/src/less/app.less')
    .pipe(plumber(end()))
    .pipe(less({
      paths: [ path.join(__dirname, 'node_modules') ]
    }))
    .pipe(gulp.dest('./demo/dist/'))
})

gulp.task('watch-javascript', () => {
  return watch([ 'src/javascript/**/*.js', 'src/javascript/**/*.jsx' ], () => {
    gulp.start('babel')
  })
})

gulp.task('watch-less', () => {
  return watch([ 'src/less/**/*.less', 'demo/src/less/**/*.less' ], () => {
    gulp.start('dev-less')
  })
})


gulp.task('default', [
  'babel',
  'dev-less',
  'watch-javascript',
  'watch-less',
  'copy-files'
])
