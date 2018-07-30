/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import { Class, functionArgs, isClass } from '@pii/utils'
import Token from '../token'

export default function InjectFunction (
  containerServiceGetter: (
    identifier: string | Symbol | Class<any> | Function
  ) => any,
  option?: string | symbol | Class<any>
): Function {
  return function (target: Object, propertyName: string | symbol, index?: any) {
    let type!: string
    let service!: string | symbol | (string | symbol)[]
    if (
      typeof option !== 'string' &&
      typeof option !== 'symbol' &&
      isClass(option)
    ) {
      service = Token(option)
    } else {
      if (!propertyName && index && typeof index === 'number') {
        propertyName = functionArgs(target)[index]
        type = Reflect.getMetadata('design:paramtypes', target)[index]
        service = (type ? Token(type) : undefined) || propertyName
      } else {
        type = Reflect.getMetadata('design:type', target, propertyName)
        service = [
          option as string | symbol,
          (type ? Token(type) : ''),
          propertyName
        ]
      }
    }
    // let _val = target[propertyName]
    let getter = function () {
      if (service instanceof Array) {
        return service
          .map(s => (s ? containerServiceGetter(s) : undefined))
          .find((s: any) => s)
      }
      return containerServiceGetter(service)
    }
    let setter = function (newVal: any) {
      if (!newVal) return
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
