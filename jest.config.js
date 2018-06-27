module.exports = {
  verbose: true,
  bail: false,
  collectCoverage: true,
  coverageReporters: ['json', 'lcov'],
  collectCoverageFrom: ['dist/**'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '/.*\\.unit\\.[tj]s$',
  globals: {
    'ts-jest': {
      'tsConfigFile': './tsconfig.babel.json'
    }
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest'
  }
  // transform: {
  //   '^.+\\.[j]s$': './devops/babel-jest.js'
  // }
}
