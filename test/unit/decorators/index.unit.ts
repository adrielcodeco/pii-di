/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  return require('../../../src/decorators')
}

test('require', () => {
  expect.assertions(6)
  const unit = requireTest()
  expect(unit).toHaveProperty('Inject')
  expect(unit).toHaveProperty('InjectMany')
  expect(unit).toHaveProperty('ScopeService')
  expect(unit).toHaveProperty('SingletonService')
  expect(unit).toHaveProperty('TransientService')
  expect(Object.keys(unit).length).toEqual(5)
})
