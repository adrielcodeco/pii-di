/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import Container from '../container'

export function InjectMany (option?: string | symbol): Function {
  return function (
    target: Object,
    propertyName: string | symbol,
    index?: number
  ) {
    // const propertyType = Reflect.getMetadata(
    //   'design:type',
    //   target,
    //   propertyName
    // )
    const service = option || propertyName
    // let _val = target[propertyName]
    let getter = function () {
      return Container.getServices(service)
    }
    let setter = function (newVal: any) {
      throw new Error('This property has been injected, can not be setted')
    }
    Reflect.deleteProperty(target, propertyName)
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}
