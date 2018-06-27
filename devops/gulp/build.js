const path = require('path')
const gulp = require('gulp')
const runSequence = require('run-sequence')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const prettierEslint = require('gulp-prettier-eslint')

const tsProject = ts.createProject(require.resolve('../../tsconfig.babel.json'))

gulp.task('ts-build', () =>
  gulp
    .src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.identityMap())
    .pipe(tsProject())
    .pipe(babel())
    .pipe(prettierEslint())
    .pipe(
      sourcemaps.mapSources((sourcePath, file) => {
        if (/\.js$/.test(sourcePath)) return sourcePath
        return path.relative(
          path.dirname(path.resolve(process.cwd(), './dist', sourcePath)),
          path.resolve(
            process.cwd(),
            './src',
            sourcePath
          )
        )
      })
    )
    .pipe(
      sourcemaps.write('.', {
        includeContent: false
      })
    )
    .pipe(gulp.dest('dist'))
)

gulp.task('build', function (callback) {
  runSequence('clean-dist', 'clean-coverage', 'ts-build', callback)
})
