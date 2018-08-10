/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export {}

const requireTest = () => {
  jest.resetModules()
  return require('../../src/decorators/inject').Inject
}

describe('Inject BDD suite', () => {
  test('inject with propertyName as identifier', () => {
    const Inject = requireTest()
    const Container = require('../../src/container').default
    Container.addSingleton('id', 1001)
    class Dummy {
      @Inject() id: any
    }
    const dummy = new Dummy()
    expect(dummy.id).toEqual(1001)
  })

  test('inject with explicit identifier', () => {
    const Inject = requireTest()
    const Container = require('../../src/container').default
    Container.addSingleton('identifier', 1001)
    class Dummy {
      @Inject('identifier') id: any
    }
    const dummy = new Dummy()
    expect(dummy.id).toEqual(1001)
  })

  test('inject with implicit type identifier', () => {
    const Inject = requireTest()
    const Container = require('../../src/container').default
    class Identifier { }
    Container.addSingleton(Identifier, 1001)
    class Dummy {
      @Inject() id: Identifier
    }
    const dummy = new Dummy()
    expect(dummy.id).toEqual(1001)
  })

  test('inject with explicit type identifier', () => {
    const Inject = requireTest()
    const Container = require('../../src/container').default
    class Identifier { }
    Container.addSingleton(Identifier, 1001)
    class Dummy {
      @Inject(Identifier) id: any
    }
    const dummy = new Dummy()
    expect(dummy.id).toEqual(1001)
  })
})
