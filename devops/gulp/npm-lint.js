const gulp = require('gulp')
const run = require('gulp-run-command').default

gulp.task('npm-lint', run('npm run lint'))
