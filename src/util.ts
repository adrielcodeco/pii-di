/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Nullable < T > = T | undefined

export type Class < T > = { new (...args: any[]): T }

export function cast<T> (value: any) {
  return value as T
}

export function isString (value: any): boolean {
  return typeof value === 'string'
}

export function isSymbol (value: any): boolean {
  return typeof value === 'symbol'
}
