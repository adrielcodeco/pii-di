/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {}

const requireTest = () => {
  jest.resetModules()
  return require('../../src/keyValue').default
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

test('new', () => {
  expect.assertions(2)
  const KeyValue = requireTest()
  const keyValue = new KeyValue('test1', 'test2')
  expect(keyValue.key).toBe('test1')
  expect(keyValue.value).toBe('test2')
})
