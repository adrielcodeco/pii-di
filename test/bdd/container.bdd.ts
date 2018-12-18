/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

export {}

const requireTest = () => {
  jest.resetModules()
  Reflect.deleteProperty(global, 'pii_di_global_container')
  Reflect.deleteProperty(global, 'pii_di_singleton_container')
  Reflect.deleteProperty(global, 'pii_di_transient_container')
  return require('../../src/container').default
}

describe('Container BDD suite', () => {
  describe('addSingleton', () => {
    describe('with string identifier', () => {
      describe('and primitive type as value', () => {
        test('returning same value when get service from container', () => {
          const test = requireTest()
          test.addSingleton('identifier', 1001)
          expect(test.get('identifier')).toEqual(1001)
        })

        test('returning first value added when get service added with replace=false from container', () => {
          const test = requireTest()
          test.addSingleton('identifier', 1001)
          test.addSingleton('identifier', 1002, false)
          expect(test.get('identifier')).toEqual(1001)
        })

        test('returning last value added when get service added with replace=true from container', () => {
          const test = requireTest()
          test.addSingleton('identifier', 1001)
          test.addSingleton('identifier', 1002, true)
          expect(test.get('identifier')).toEqual(1002)
        })
      })

      describe('and es6 class as value', () => {
        test('returning class when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addSingleton('identifier', Dummy)
          const dummy = test.get('identifier')
          expect(dummy).toStrictEqual(Dummy)
          expect(dummy).not.toBeInstanceOf(Dummy)
        })

        test('returning first class added when get service added with replace=false from container', () => {
          class Dummy1 {
            id = Math.random()
          }
          class Dummy2 {
            id = Math.random()
          }
          const test = requireTest()
          test.addSingleton('identifier', Dummy1)
          test.addSingleton('identifier', Dummy2, false)
          const dummy = test.get('identifier')
          expect(dummy).toStrictEqual(Dummy1)
          expect(dummy).not.toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy1)
        })

        test('returning last class added when get service added with replace=true from container', () => {
          class Dummy1 {
            id = Math.random()
          }
          class Dummy2 {
            id = Math.random()
          }
          const test = requireTest()
          test.addSingleton('identifier', Dummy1)
          test.addSingleton('identifier', Dummy2, true)
          const dummy = test.get('identifier')
          expect(dummy).not.toStrictEqual(Dummy1)
          expect(dummy).toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy2)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addSingleton('identifier', dummy)
          const dummyInjected = test.get('identifier')
          expect(dummyInjected).toStrictEqual(dummy)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning first class instance added when get service added with replace=false from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy1 = new Dummy()
          const dummy2 = new Dummy()
          test.addSingleton('identifier', dummy1)
          test.addSingleton('identifier', dummy2, false)
          const dummyInjected = test.get('identifier')
          expect(dummyInjected).toStrictEqual(dummy1)
          expect(dummyInjected).not.toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning last class instance added when get service added with replace=true from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy1 = new Dummy()
          const dummy2 = new Dummy()
          test.addSingleton('identifier', dummy1)
          test.addSingleton('identifier', dummy2, true)
          const dummyInjected = test.get('identifier')
          expect(dummyInjected).not.toStrictEqual(dummy1)
          expect(dummyInjected).toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addSingleton('identifier', dummy)
          const dummyInjected1 = test.get('identifier')
          const dummyInjected2 = test.get('identifier')
          expect(dummyInjected1).toStrictEqual(dummyInjected2)
        })
      })

      describe('and function class as value', () => {
        test('returning function class when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addSingleton('identifier', Dummy)
          const dummy = test.get('identifier')
          expect(dummy).toStrictEqual(Dummy)
          expect(dummy).not.toBeInstanceOf(Dummy)
        })

        test('returning first function class added when get service added with replace=false from container', () => {
          function Dummy1 () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy1.prototype.getId = function () {
            return this.id
          }
          function Dummy2 () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy2.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addSingleton('identifier', Dummy1)
          test.addSingleton('identifier', Dummy2, false)
          const dummy = test.get('identifier')
          expect(dummy).toStrictEqual(Dummy1)
          expect(dummy).not.toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy1)
        })

        test('returning last function class added when get service added with replace=true from container', () => {
          function Dummy1 () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy1.prototype.getId = function () {
            return this.id
          }
          function Dummy2 () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy2.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addSingleton('identifier', Dummy1)
          test.addSingleton('identifier', Dummy2, true)
          const dummy = test.get('identifier')
          expect(dummy).not.toStrictEqual(Dummy1)
          expect(dummy).toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy2)
        })
      })

      describe('and function class instance as value', () => {
        test('returning function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addSingleton('identifier', dummy)
          const dummyInjected = test.get('identifier')
          expect(dummyInjected).toStrictEqual(dummy)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning first function class instance added when get service added with replace=false from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy1 = new ((Dummy as any) as { new (): any })()
          const dummy2 = new ((Dummy as any) as { new (): any })()
          test.addSingleton('identifier', dummy1)
          test.addSingleton('identifier', dummy2, false)
          const dummyInjected = test.get('identifier')
          expect(dummyInjected).toStrictEqual(dummy1)
          expect(dummyInjected).not.toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning last function class instance added when get service added with replace=true from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy1 = new ((Dummy as any) as { new (): any })()
          const dummy2 = new ((Dummy as any) as { new (): any })()
          test.addSingleton('identifier', dummy1)
          test.addSingleton('identifier', dummy2, true)
          const dummyInjected = test.get('identifier')
          expect(dummyInjected).not.toStrictEqual(dummy1)
          expect(dummyInjected).toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addSingleton('identifier', dummy)
          const dummyInjected1 = test.get('identifier')
          const dummyInjected2 = test.get('identifier')
          expect(dummyInjected1).toStrictEqual(dummyInjected2)
        })
      })
    })

    describe('with symbol identifier', () => {
      describe('and primitive type as value', () => {
        test('returning same first value when get service added with replace=false from container', () => {
          const test = requireTest()
          test.addSingleton(Symbol.for('identifier'), 1001)
          test.addSingleton(Symbol.for('identifier'), 1001, false)
          expect(test.get(Symbol.for('identifier'))).toEqual(1001)
        })

        test('returning same last value when get service added with replace=true from container', () => {
          const test = requireTest()
          test.addSingleton(Symbol.for('identifier'), 1001)
          test.addSingleton(Symbol.for('identifier'), 1002, true)
          expect(test.get(Symbol.for('identifier'))).toEqual(1002)
        })
      })

      describe('and es6 class as value', () => {
        test('returning first class added when get service added with replace=false from container', () => {
          class Dummy1 {
            id = Math.random()
          }
          class Dummy2 {
            id = Math.random()
          }
          const test = requireTest()
          test.addSingleton(Symbol.for('identifier'), Dummy1)
          test.addSingleton(Symbol.for('identifier'), Dummy2, false)
          const dummy = test.get(Symbol.for('identifier'))
          expect(dummy).toStrictEqual(Dummy1)
          expect(dummy).not.toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy1)
        })

        test('returning last class added when get service added with replace=true from container', () => {
          class Dummy1 {
            id = Math.random()
          }
          class Dummy2 {
            id = Math.random()
          }
          const test = requireTest()
          test.addSingleton(Symbol.for('identifier'), Dummy1)
          test.addSingleton(Symbol.for('identifier'), Dummy2, true)
          const dummy = test.get(Symbol.for('identifier'))
          expect(dummy).not.toStrictEqual(Dummy1)
          expect(dummy).toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy1)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning first class instance added when get service added with replace=false from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy1 = new ((Dummy as any) as { new (): any })()
          const dummy2 = new ((Dummy as any) as { new (): any })()
          test.addSingleton(Symbol.for('identifier'), dummy1)
          test.addSingleton(Symbol.for('identifier'), dummy2, false)
          const dummyInjected = test.get(Symbol.for('identifier'))
          expect(dummyInjected).toStrictEqual(dummy1)
          expect(dummyInjected).not.toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning last class instance added when get service added with replace=true from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy1 = new ((Dummy as any) as { new (): any })()
          const dummy2 = new ((Dummy as any) as { new (): any })()
          test.addSingleton(Symbol.for('identifier'), dummy1)
          test.addSingleton(Symbol.for('identifier'), dummy2, true)
          const dummyInjected = test.get(Symbol.for('identifier'))
          expect(dummyInjected).not.toStrictEqual(dummy1)
          expect(dummyInjected).toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addSingleton(Symbol.for('identifier'), dummy)
          const dummyInjected1 = test.get(Symbol.for('identifier'))
          const dummyInjected2 = test.get(Symbol.for('identifier'))
          expect(dummyInjected1).toStrictEqual(dummyInjected2)
        })
      })

      describe('and function class as value', () => {
        test('returning first function class added when get service added with replace=false from container', () => {
          function Dummy1 () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy1.prototype.getId = function () {
            return this.id
          }
          function Dummy2 () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy2.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addSingleton(Symbol.for('identifier'), Dummy1)
          test.addSingleton(Symbol.for('identifier'), Dummy2, false)
          const dummy = test.get(Symbol.for('identifier'))
          expect(dummy).toStrictEqual(Dummy1)
          expect(dummy).not.toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy1)
        })

        test('returning last function class added when get service added with replace=true from container', () => {
          function Dummy1 () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy1.prototype.getId = function () {
            return this.id
          }
          function Dummy2 () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy2.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addSingleton(Symbol.for('identifier'), Dummy1)
          test.addSingleton(Symbol.for('identifier'), Dummy2, true)
          const dummy = test.get(Symbol.for('identifier'))
          expect(dummy).not.toStrictEqual(Dummy1)
          expect(dummy).toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy1)
        })
      })

      describe('and function class instance as value', () => {
        test('returning first function class instance added when get service added with replace=false from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy1 = new ((Dummy as any) as { new (): any })()
          const dummy2 = new ((Dummy as any) as { new (): any })()
          test.addSingleton(Symbol.for('identifier'), dummy1)
          test.addSingleton(Symbol.for('identifier'), dummy2, false)
          const dummyInjected = test.get(Symbol.for('identifier'))
          expect(dummyInjected).toStrictEqual(dummy1)
          expect(dummyInjected).not.toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning last function class instance added when get service added with replace=true from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy1 = new ((Dummy as any) as { new (): any })()
          const dummy2 = new ((Dummy as any) as { new (): any })()
          test.addSingleton(Symbol.for('identifier'), dummy1)
          test.addSingleton(Symbol.for('identifier'), dummy2, true)
          const dummyInjected = test.get(Symbol.for('identifier'))
          expect(dummyInjected).not.toStrictEqual(dummy1)
          expect(dummyInjected).toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addSingleton(Symbol.for('identifier'), dummy)
          const dummyInjected1 = test.get(Symbol.for('identifier'))
          const dummyInjected2 = test.get(Symbol.for('identifier'))
          expect(dummyInjected1).toStrictEqual(dummyInjected2)
        })
      })
    })

    describe('with Type identifier', () => {
      class AbstractDummy {
        id = 1001
      }

      describe('and primitive type as value', () => {
        test('returning same first value when get service added with replace=false from container', () => {
          const test = requireTest()
          test.addSingleton(AbstractDummy, 1001)
          test.addSingleton(AbstractDummy, 1002, false)
          expect(test.get(AbstractDummy)).toEqual(1001)
        })

        test('returning same last value when get service added with replace=true from container', () => {
          const test = requireTest()
          test.addSingleton(AbstractDummy, 1001)
          test.addSingleton(AbstractDummy, 1002, true)
          expect(test.get(AbstractDummy)).toEqual(1002)
        })
      })

      describe('and es6 class as value', () => {
        test('returning first class added when get service added with replace=false from container', () => {
          class Dummy1 extends AbstractDummy {
            id = Math.random()
          }
          class Dummy2 extends AbstractDummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addSingleton(AbstractDummy, Dummy1)
          test.addSingleton(AbstractDummy, Dummy2, false)
          const dummy = test.get(AbstractDummy)
          expect(dummy).toStrictEqual(Dummy1)
          expect(dummy).not.toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy1)
        })

        test('returning last class added when get service added with replace=true from container', () => {
          class Dummy1 extends AbstractDummy {
            id = Math.random()
          }
          class Dummy2 extends AbstractDummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addSingleton(AbstractDummy, Dummy1)
          test.addSingleton(AbstractDummy, Dummy2, true)
          const dummy = test.get(AbstractDummy)
          expect(dummy).not.toStrictEqual(Dummy1)
          expect(dummy).toStrictEqual(Dummy2)
          expect(dummy).not.toBeInstanceOf(Dummy2)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning first class instance added when get service added with replace=false from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy1 = new Dummy()
          const dummy2 = new Dummy()
          test.addSingleton(AbstractDummy, dummy1)
          test.addSingleton(AbstractDummy, dummy2, false)
          const dummyInjected = test.get(AbstractDummy)
          expect(dummyInjected).toStrictEqual(dummy1)
          expect(dummyInjected).not.toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning last class instance added when get service added with replace=true from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy1 = new Dummy()
          const dummy2 = new Dummy()
          test.addSingleton(AbstractDummy, dummy1)
          test.addSingleton(AbstractDummy, dummy2, true)
          const dummyInjected = test.get(AbstractDummy)
          expect(dummyInjected).not.toStrictEqual(dummy1)
          expect(dummyInjected).toStrictEqual(dummy2)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addSingleton(AbstractDummy, dummy)
          const dummyInjected1 = test.get(AbstractDummy)
          const dummyInjected2 = test.get(AbstractDummy)
          expect(dummyInjected1).toStrictEqual(dummyInjected2)
        })
      })

      describe('and function class as value', () => {
        test('returning function class when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addSingleton(AbstractDummy, Dummy)
          const dummy = test.get(AbstractDummy)
          expect(dummy).toStrictEqual(Dummy)
          expect(dummy).not.toBeInstanceOf(Dummy)
        })
      })

      describe('and function class instance as value', () => {
        test('returning function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addSingleton(AbstractDummy, dummy)
          const dummyInjected = test.get(AbstractDummy)
          expect(dummyInjected).toStrictEqual(dummy)
          expect(dummyInjected).toBeInstanceOf(Dummy)
        })

        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addSingleton(AbstractDummy, dummy)
          const dummyInjected1 = test.get(AbstractDummy)
          const dummyInjected2 = test.get(AbstractDummy)
          expect(dummyInjected1).toStrictEqual(dummyInjected2)
        })
      })
    })
  })

  describe('addTransient', () => {
    describe('with string identifier', () => {
      describe('and primitive type as value', () => {
        test('returning same value when get service from container', () => {
          const test = requireTest()
          test.addTransient('identifier', 1001)
          expect(test.get('identifier')).toEqual(1001)
        })
      })

      describe('and es6 class as value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy {
            id = 1001
          }
          const test = requireTest()
          test.addTransient('identifier', Dummy)
          const dummy = test.get('identifier')
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
        })

        test('returning new class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addTransient('identifier', Dummy)
          const dummy1 = test.get('identifier')
          const dummy2 = test.get('identifier')
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addTransient('identifier', dummy)
          expect(test.get('identifier')).toStrictEqual(dummy)
        })
      })

      describe('and function class as value', () => {
        test('returning function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = 1001
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addTransient('identifier', Dummy)
          const dummy = test.get('identifier')
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
          expect(dummy.getId()).toEqual(1001)
        })

        test('returning new function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addTransient('identifier', Dummy)
          const dummy1 = test.get('identifier')
          const dummy2 = test.get('identifier')
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and function class instance as value', () => {
        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addTransient('identifier', dummy)
          expect(test.get('identifier')).toStrictEqual(dummy)
        })
      })
    })

    describe('with symbol identifier', () => {
      describe('and primitive type as value', () => {
        test('returning same value when get service from container', () => {
          const test = requireTest()
          test.addTransient(Symbol.for('identifier'), 1001)
          expect(test.get(Symbol.for('identifier'))).toEqual(1001)
        })
      })

      describe('and es6 class as value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy {
            id = 1001
          }
          const test = requireTest()
          test.addTransient(Symbol.for('identifier'), Dummy)
          const dummy = test.get(Symbol.for('identifier'))
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
        })

        test('returning new class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addTransient(Symbol.for('identifier'), Dummy)
          const dummy1 = test.get(Symbol.for('identifier'))
          const dummy2 = test.get(Symbol.for('identifier'))
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addTransient(Symbol.for('identifier'), dummy)
          expect(test.get(Symbol.for('identifier'))).toStrictEqual(dummy)
        })
      })

      describe('and function class as value', () => {
        test('returning function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = 1001
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addTransient(Symbol.for('identifier'), Dummy)
          const dummy = test.get(Symbol.for('identifier'))
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
          expect(dummy.getId()).toEqual(1001)
        })

        test('returning new function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addTransient(Symbol.for('identifier'), Dummy)
          const dummy1 = test.get(Symbol.for('identifier'))
          const dummy2 = test.get(Symbol.for('identifier'))
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and function class instance as value', () => {
        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addTransient(Symbol.for('identifier'), dummy)
          expect(test.get(Symbol.for('identifier'))).toStrictEqual(dummy)
        })
      })
    })

    describe('with Type identifier', () => {
      class AbstractDummy {
        id = 1001
      }

      describe('without value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy {
            id = 1001
          }
          const test = requireTest()
          test.addTransient(Dummy)
          const dummy = test.get(Dummy)
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
        })

        test('returning new class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addTransient(Dummy)
          const dummy1 = test.get(Dummy)
          const dummy2 = test.get(Dummy)
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and primitive type as value', () => {
        test('returning same value when get service from container', () => {
          const test = requireTest()
          test.addTransient(AbstractDummy, 1001)
          expect(test.get(AbstractDummy)).toEqual(1001)
        })
      })

      describe('and es6 class as value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy extends AbstractDummy {
            id = 1001
          }
          const test = requireTest()
          test.addTransient(AbstractDummy, Dummy)
          const dummy = test.get(AbstractDummy)
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
        })

        test('returning new class instance when get service from container', () => {
          class Dummy extends AbstractDummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addTransient(AbstractDummy, Dummy)
          const dummy1 = test.get(AbstractDummy)
          const dummy2 = test.get(AbstractDummy)
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addTransient(AbstractDummy, dummy)
          expect(test.get(AbstractDummy)).toStrictEqual(dummy)
        })
      })

      describe('and function class as value', () => {
        test('returning function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = 1001
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addTransient(AbstractDummy, Dummy)
          const dummy = test.get(AbstractDummy)
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
          expect(dummy.getId()).toEqual(1001)
        })

        test('returning new function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addTransient(AbstractDummy, Dummy)
          const dummy1 = test.get(AbstractDummy)
          const dummy2 = test.get(AbstractDummy)
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and function class instance as value', () => {
        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addTransient(AbstractDummy, dummy)
          expect(test.get(AbstractDummy)).toStrictEqual(dummy)
        })
      })
    })
  })

  describe('addScoped', () => {
    describe('with string identifier', () => {
      describe('and primitive type as value', () => {
        test('returning same value when get service from container', () => {
          const test = requireTest()
          test.addScoped('identifier', 1001)
          expect(test.get('identifier')).toEqual(1001)
        })
      })

      describe('and es6 class as value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy {
            id = 1001
          }
          const test = requireTest()
          test.addScoped('identifier', Dummy)
          const dummy = test.get('identifier')
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
        })

        test('returning new class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addScoped('identifier', Dummy)
          const dummy1 = test.get('identifier')
          const dummy2 = test.get('identifier')
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addScoped('identifier', dummy)
          expect(test.get('identifier')).toStrictEqual(dummy)
        })
      })

      describe('and function class as value', () => {
        test('returning function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = 1001
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addScoped('identifier', Dummy)
          const dummy = test.get('identifier')
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
          expect(dummy.getId()).toEqual(1001)
        })

        test('returning new function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addScoped('identifier', Dummy)
          const dummy1 = test.get('identifier')
          const dummy2 = test.get('identifier')
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and function class instance as value', () => {
        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addScoped('identifier', dummy)
          expect(test.get('identifier')).toStrictEqual(dummy)
        })
      })
    })

    describe('with symbol identifier', () => {
      describe('and primitive type as value', () => {
        test('returning same value when get service from container', () => {
          const test = requireTest()
          test.addScoped(Symbol.for('identifier'), 1001)
          expect(test.get(Symbol.for('identifier'))).toEqual(1001)
        })
      })

      describe('and es6 class as value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy {
            id = 1001
          }
          const test = requireTest()
          test.addScoped(Symbol.for('identifier'), Dummy)
          const dummy = test.get(Symbol.for('identifier'))
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
        })

        test('returning new class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addScoped(Symbol.for('identifier'), Dummy)
          const dummy1 = test.get(Symbol.for('identifier'))
          const dummy2 = test.get(Symbol.for('identifier'))
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addScoped(Symbol.for('identifier'), dummy)
          expect(test.get(Symbol.for('identifier'))).toStrictEqual(dummy)
        })
      })

      describe('and function class as value', () => {
        test('returning function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = 1001
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addScoped(Symbol.for('identifier'), Dummy)
          const dummy = test.get(Symbol.for('identifier'))
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
          expect(dummy.getId()).toEqual(1001)
        })

        test('returning new function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addScoped(Symbol.for('identifier'), Dummy)
          const dummy1 = test.get(Symbol.for('identifier'))
          const dummy2 = test.get(Symbol.for('identifier'))
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and function class instance as value', () => {
        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addScoped(Symbol.for('identifier'), dummy)
          expect(test.get(Symbol.for('identifier'))).toStrictEqual(dummy)
        })
      })
    })

    describe('with Type identifier', () => {
      class AbstractDummy {
        id = 1001
      }

      describe('without value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy {
            id = 1001
          }
          const test = requireTest()
          test.addScoped(Dummy)
          const dummy = test.get(Dummy)
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
        })

        test('returning new class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addScoped(Dummy)
          const dummy1 = test.get(Dummy)
          const dummy2 = test.get(Dummy)
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and primitive type as value', () => {
        test('returning same value when get service from container', () => {
          const test = requireTest()
          test.addScoped(AbstractDummy, 1001)
          expect(test.get(AbstractDummy)).toEqual(1001)
        })
      })

      describe('and es6 class as value', () => {
        test('returning class instance when get service from container', () => {
          class Dummy extends AbstractDummy {
            id = 1001
          }
          const test = requireTest()
          test.addScoped(AbstractDummy, Dummy)
          const dummy = test.get(AbstractDummy)
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
        })

        test('returning new class instance when get service from container', () => {
          class Dummy extends AbstractDummy {
            id = Math.random()
          }
          const test = requireTest()
          test.addScoped(AbstractDummy, Dummy)
          const dummy1 = test.get(AbstractDummy)
          const dummy2 = test.get(AbstractDummy)
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and es6 class instance as value', () => {
        test('returning same class instance when get service from container', () => {
          class Dummy {
            id = Math.random()
          }
          const test = requireTest()
          const dummy = new Dummy()
          test.addScoped(AbstractDummy, dummy)
          expect(test.get(AbstractDummy)).toStrictEqual(dummy)
        })
      })

      describe('and function class as value', () => {
        test('returning function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = 1001
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addScoped(AbstractDummy, Dummy)
          const dummy = test.get(AbstractDummy)
          expect(dummy).toBeInstanceOf(Dummy)
          expect(dummy.id).toEqual(1001)
          expect(dummy.getId()).toEqual(1001)
        })

        test('returning new function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          test.addScoped(AbstractDummy, Dummy)
          const dummy1 = test.get(AbstractDummy)
          const dummy2 = test.get(AbstractDummy)
          expect(dummy1).not.toStrictEqual(dummy2)
        })
      })

      describe('and function class instance as value', () => {
        test('returning same function class instance when get service from container', () => {
          function Dummy () {
            // @ts-ignore
            this.id = Math.random()
          }
          Dummy.prototype.getId = function () {
            return this.id
          }
          const test = requireTest()
          const dummy = new ((Dummy as any) as { new (): any })()
          test.addScoped(AbstractDummy, dummy)
          expect(test.get(AbstractDummy)).toStrictEqual(dummy)
        })
      })
    })
  })

  describe('has', () => {
    describe('with string identifier', () => {
      test('no finding', () => {
        const test = requireTest()
        expect(test.has('identifier')).toBeFalsy()
      })

      test('finding', () => {
        const test = requireTest()
        test.addSingleton('identifier', 1001)
        expect(test.has('identifier')).toBeTruthy()
      })
    })

    describe('with symbol identifier', () => {
      test('no finding', () => {
        const test = requireTest()
        expect(test.has(Symbol.for('identifier'))).toBeFalsy()
      })

      test('finding', () => {
        const test = requireTest()
        test.addSingleton(Symbol.for('identifier'), 1001)
        expect(test.has(Symbol.for('identifier'))).toBeTruthy()
      })
    })

    describe('with Type identifier', () => {
      class AbstractDummy {
        id = 1001
      }

      test('no finding', () => {
        const test = requireTest()
        expect(test.has(AbstractDummy)).toBeFalsy()
      })

      test('finding', () => {
        const test = requireTest()
        test.addSingleton(AbstractDummy, 1001)
        expect(test.has(AbstractDummy)).toBeTruthy()
      })
    })
  })

  describe('get', () => {
    describe('with string identifier', () => {
      test('finding', () => {
        const test = requireTest()
        test.addSingleton('identifier', 1001)
        expect(test.get('identifier')).toEqual(1001)
      })
    })

    describe('with symbol identifier', () => {
      test('finding', () => {
        const test = requireTest()
        test.addSingleton(Symbol.for('identifier'), 1001)
        expect(test.get(Symbol.for('identifier'))).toEqual(1001)
      })
    })

    describe('with Type identifier', () => {
      class AbstractDummy {
        id = 1001
      }

      test('finding', () => {
        const test = requireTest()
        test.addSingleton(AbstractDummy, 1001)
        expect(test.get(AbstractDummy)).toEqual(1001)
      })
    })
  })

  describe('getServices', () => {
    describe('with string identifier', () => {
      test('finding', () => {
        const test = requireTest()
        test.addSingleton('identifier', 1001, false)
        test.addSingleton('identifier', 1002, false)
        test.addSingleton('identifier', 1003, false)
        expect(test.getServices('identifier')).toEqual([1001, 1002, 1003])
      })
    })

    describe('with symbol identifier', () => {
      test('finding', () => {
        const test = requireTest()
        test.addSingleton(Symbol.for('identifier'), 1001, false)
        test.addSingleton(Symbol.for('identifier'), 1002, false)
        test.addSingleton(Symbol.for('identifier'), 1003, false)
        expect(test.getServices(Symbol.for('identifier'))).toEqual([
          1001,
          1002,
          1003
        ])
      })
    })

    describe('with Type identifier', () => {
      class AbstractDummy {
        id = 1001
      }

      test('finding', () => {
        const test = requireTest()
        test.addSingleton(AbstractDummy, 1001, false)
        test.addSingleton(AbstractDummy, 1002, false)
        test.addSingleton(AbstractDummy, 1003, false)
        expect(test.getServices(AbstractDummy)).toEqual([1001, 1002, 1003])
      })
    })
  })

  describe('removeSingleton', () => {
    describe('with primitive identifier', () => {
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addSingleton('identifier', 1001)
        test.removeSingleton('identifier')
        expect(test.get('identifier')).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addSingleton('identifier', 1001)
        test.addTransient('identifier', 1002)
        test.removeSingleton('identifier')
        expect(test.get('identifier')).toEqual(1002)
      })
    })

    describe('with symbol identifier', () => {
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addSingleton(Symbol.for('identifier'), 1001)
        test.removeSingleton(Symbol.for('identifier'))
        expect(test.get(Symbol.for('identifier'))).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addSingleton(Symbol.for('identifier'), 1001)
        test.addTransient(Symbol.for('identifier'), 1002)
        test.removeSingleton(Symbol.for('identifier'))
        expect(test.get(Symbol.for('identifier'))).toEqual(1002)
      })
    })

    describe('with type identifier', () => {
      class Dummy {
        id = Math.random()
      }
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addSingleton(Dummy, 1001)
        test.removeSingleton(Dummy)
        expect(test.get(Dummy)).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addSingleton(Dummy, 1001)
        test.addTransient(Dummy, 1002)
        test.removeSingleton(Dummy)
        expect(test.get(Dummy)).toEqual(1002)
      })
    })
  })

  describe('removeTransient', () => {
    describe('with primitive identifier', () => {
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addTransient('identifier', 1001)
        test.removeTransient('identifier')
        expect(test.get('identifier')).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addTransient('identifier', 1001)
        test.addScoped('identifier', 1002)
        test.removeTransient('identifier')
        expect(test.get('identifier')).toEqual(1002)
      })
    })

    describe('with symbol identifier', () => {
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addTransient(Symbol.for('identifier'), 1001)
        test.removeTransient(Symbol.for('identifier'))
        expect(test.get(Symbol.for('identifier'))).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addTransient(Symbol.for('identifier'), 1001)
        test.addScoped(Symbol.for('identifier'), 1002)
        test.removeTransient(Symbol.for('identifier'))
        expect(test.get(Symbol.for('identifier'))).toEqual(1002)
      })
    })

    describe('with type identifier', () => {
      class Dummy {
        id = Math.random()
      }
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addTransient(Dummy, 1001)
        test.removeTransient(Dummy)
        expect(test.get(Dummy)).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addTransient(Dummy, 1001)
        test.addScoped(Dummy, 1002)
        test.removeTransient(Dummy)
        expect(test.get(Dummy)).toEqual(1002)
      })
    })
  })

  describe('removeScoped', () => {
    describe('with primitive identifier', () => {
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addScoped('identifier', 1001)
        test.removeScoped('identifier')
        expect(test.get('identifier')).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addScoped('identifier', 1001)
        test.addTransient('identifier', 1002)
        test.removeScoped('identifier')
        expect(test.get('identifier')).toEqual(1002)
      })
    })

    describe('with symbol identifier', () => {
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addScoped(Symbol.for('identifier'), 1001)
        test.removeScoped(Symbol.for('identifier'))
        expect(test.get(Symbol.for('identifier'))).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addScoped(Symbol.for('identifier'), 1001)
        test.addTransient(Symbol.for('identifier'), 1002)
        test.removeScoped(Symbol.for('identifier'))
        expect(test.get(Symbol.for('identifier'))).toEqual(1002)
      })
    })

    describe('with type identifier', () => {
      class Dummy {
        id = Math.random()
      }
      test('removing from singleton container', () => {
        const test = requireTest()
        test.addScoped(Dummy, 1001)
        test.removeScoped(Dummy)
        expect(test.get(Dummy)).toBeUndefined()
      })

      test('removing only from singleton container', () => {
        const test = requireTest()
        test.addScoped(Dummy, 1001)
        test.addTransient(Dummy, 1002)
        test.removeScoped(Dummy)
        expect(test.get(Dummy)).toEqual(1002)
      })
    })
  })

  describe('container precedence', () => {
    test('returning from scoped container if found', () => {
      const test = requireTest()
      test.addTransient('identifier', 1002)
      test.addScoped('identifier', 1003)
      test.addSingleton('identifier', 1001)
      expect(test.get('identifier')).toEqual(1003)
    })

    test('returning from transient container if scoped not found', () => {
      const test = requireTest()
      test.addTransient('identifier', 1002)
      test.addSingleton('identifier', 1001)
      expect(test.get('identifier')).toEqual(1002)
    })
  })
})
