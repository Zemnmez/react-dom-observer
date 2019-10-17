/**
 * @module resize-observer-hook
 */

import { useObserver } from './useObserver'
import { ResizeObserver } from 'resize-observer-browser' // @types/resize-observer-browser
import { ResizeObserverEntry, callbackRef } from './declarations'

/**
 * [[useResizeObserver]] is a React hook exposing the functionality of
 * the [ResizeObserver][mdn: ResizeObserver] API, which is an efficient
 * way to tell when an element changes size.
 *
 * The function returns two values in an array.
 *
 * 1. a [ResizeObserverEntry][mdn: ResizeObserverEntry] or `undefined`,
 * representing the current known size.
 *
 * 2.a React ref you can pass in the `ref={}` parameter to any
 * elements you want to track the size of.
 *
 *
 * #### example [useResizeObserver](example/src/useResizeObserver.js)
 *
 */
export const useResizeObserver = (
  Default?: ResizeObserverEntry
): [ResizeObserverEntry | undefined, callbackRef] => useObserver(ResizeObserver)(Default)






