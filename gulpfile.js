const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');

const babelConfig = {
  "plugins": [
    "transform-class-properties"
  ],
  "presets": [
    "es2015",
    "stage-0",
    "react",
    "es2015-loose"
  ]
};

gulp.task('babel', () => {
	return gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(changed('lib'))
		.pipe(babel(babelConfig))
		.pipe(gulp.dest('lib'));
});

gulp.task('default', () => {
  watch('src/**/*.js', () => {
    gulp.start("babel");
  })
})