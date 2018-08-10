const gulp = require('gulp')
const jest = require('gulp-jest').default

gulp.task('test-bdd', () =>
  gulp
    .src('test')
    .pipe(jest({ testRegex: '/.*/test/.*\\.bdd\\.[tj]s$', collectCoverage: false }))
)
