const gulp = require('gulp')
const runSequence = require('run-sequence')
const jest = require('gulp-jest').default
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul')
const run = require('gulp-run-command').default
const modifyFile = require('gulp-modify-file')

gulp.task('jest', () => gulp.src('test').pipe(jest()))

gulp.task('remap-istanbul', () =>
  gulp.src('coverage/coverage-final.json').pipe(
    remapIstanbul({
      reports: {
        json: 'coverage/remap-coverage-final.json'
      }
    })
  )
)

gulp.task('coverage-remove-source', () =>
  gulp
    .src('coverage/remap-coverage-final.json', { base: process.cwd() })
    .pipe(
      modifyFile((content, path, file) => {
        const newJson = {}
        const json = JSON.parse(content)
        for (file in json) {
          if (!/\.js/.test(file)) {
            newJson[file] = json[file]
          }
        }
        return JSON.stringify(newJson)
      })
    )
    .pipe(gulp.dest(process.cwd()))
)

gulp.task(
  'report-text',
  run(
    'node_modules/.bin/istanbul report --include coverage/remap-coverage-final.json text'
  )
)
gulp.task(
  'report-html',
  run(
    'node_modules/.bin/istanbul report --include coverage/remap-coverage-final.json --dir coverage/remap-lcov-report html'
  )
)

gulp.task('test', callback => {
  runSequence(
    'jest',
    'remap-istanbul',
    'coverage-remove-source',
    'report-text',
    'report-html',
    callback
  )
})
