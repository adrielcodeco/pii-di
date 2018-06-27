/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

const requireTest = () => {
  return require('../dist')
}

test('require', () => {
  expect.assertions(8)
  const unit = requireTest()
  expect(unit).toHaveProperty('Container')
  expect(unit).toHaveProperty('Token')
  expect(unit).toHaveProperty('Inject')
  expect(unit).toHaveProperty('InjectMany')
  expect(unit).toHaveProperty('ScopeService')
  expect(unit).toHaveProperty('SingletonService')
  expect(unit).toHaveProperty('TransientService')
  expect(Object.keys(unit).length).toEqual(7)
})
