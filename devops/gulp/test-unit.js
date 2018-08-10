const gulp = require('gulp')
const jest = require('gulp-jest').default

gulp.task('test-unit', () =>
  gulp
    .src('test')
    .pipe(jest({ testRegex: '/.*/test/.*\\.unit\\.[tj]s$', collectCoverage: true }))
)
