/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import Container from '../container'
import InjectFunction from './injectLogic'

export function InjectMany (identifier?: any): Function {
  return InjectFunction(
    (identifier: any) => {
      if (Container.has(identifier)) {
        return Container.getServices(identifier)
      }
      return undefined
    },
    identifier
  )
}
