/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import { Class } from '@pii/utils'
import Container from '../container'
import InjectFunction from './injectLogic'

export function Inject (option?: string | symbol | Class<any>): Function {
  return InjectFunction(Container.get, option)
}
