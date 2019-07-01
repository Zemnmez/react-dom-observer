/**
 * @module react-observer-hook
 */

import { useObserver } from './useObserver'
import { callbackRef, IntersectionObserverEntry, IntersectionObserverInit } from './declarations'


// https://github.com/Microsoft/TypeScript/issues/16255#issuecomment-436935103
/**
 * @hidden
 */
declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver
  }
}

/**
  * [[useIntersectionObserver]] is a React hook exposing the functionality of the
  * [IntersectionObserver][mdn: IntersectionObserver] API, which is an efficient way to
  * tell when an element becomes visible within some viewport, which could be
  * the parent window, or the containing element.
  *
  * This function returns a factory function, which when called returns two values in an array:
  *
  * 1. An [IntersectionObserverEntry][mdn: IntersectionObserverEntry], or `undefined` representing
  * details on how the children were modified.
  *
  * 2. A [React ref][react docs: react ref] that you can pass in the `ref={}`
  * parameter to any elements you want to track child changes for.
  *
  * This factory type construction allows you to pass your useIntersectionObserver value
  * any number to children that you want to intersect with you.
  *
  * [mdn: IntersectionObserver]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver "MDN docs: IntersectionObserver"
  * [mdn: IntersectionObserverEntry]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry "MDN docs: IntersectionObserverEntry"
  * [react docs: react ref]: https://reactjs.org/docs/refs-and-the-dom.html "React Docs: Refs and the DOM"
  *
  * #### example [useIntersectionObserver](example/src/useIntersectionObserver.js)
  *
  * ```javascript
  * import React from 'react'
  * import { useIntersectionObserver } from 'react-observer-hook'
  *
  * export default () => {
  *   const [{
  *     bindingClientRect: { width, height },
  *     intersectionRatio,
  *     intersectionRect,
  *     isIntersecting,
  *     rootBounds,
  *     target,
  *     time
  *   }, ref] = useResizeObserver()
  *
  *   return <React.Fragment>
  *     <textarea ref={ref}>
  *       Resize me!!
  *   </textarea>
  *   <table> <thead><tr><td>param,</td><td>value</td></tr></thead>
  *   <tbody>
  *       {Object.entries({
  *         width, height, intersectionRatio, intersectionRect,
  *         isIntersecting, rootBounds, target, time
  *       }).map(([k,v]) => <tr><td>{k}</td><td>{v}</td></tr>)}
  *   </tbody></table>
  *   </React.Fragment>
  *
  * }
  *
  * ```
  */
export const useIntersectionObserver = (
  options?: IntersectionObserverInit
): () => [IntersectionObserverEntry | undefined, callbackRef] => useObserver(IntersectionObserver, options)
