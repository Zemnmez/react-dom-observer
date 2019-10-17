/**
 * @module react-observer-hook
 */

import { useObserver } from './useObserver'
import { callbackRef } from './declarations'
/**
  * [[useMutationObserver]] is a React hook exposing the functionality of the
  * [MutationObserver][mdn: MutationObserver] API, which is an efficient way to
  * tell when the children of an element changes.
  *
  * This function returns two values in an array:
  *
  * 1. A [MutationRecord][mdn: MutationRecord], or `undefined` representing
  * details on how the children were modified.
  *
  * 2. A [React ref][react docs: react ref] that you can pass in the `ref={}`
  * parameter to any elements you want to track child changes for.
  *
  * [mdn: MutationObserver]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver "MDN docs: MutationObserver"
  * [mdn: MutationRecord]: https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord "MDN docs: MutationRecord"
  * [react docs: react ref]: https://reactjs.org/docs/refs-and-the-dom.html "React Docs: Refs and the DOM"
  *
  * #### example [useMutationObserver](example/src/useMutationObserver.js)
  *
  * ```javascript
  * import React from 'react'
  * import { useMutationObserver } from 'react-observer-hook'
  *
  * export default () => {
  *   const [mutation, ref] = useMutationObserver()
  *   const childRef = React.useRef()
  *   const [text, setText] = React.useState("example")
  *   React.useEffect(() => {
  *     window.setTimeout(() => setText("text2"), 1000)
  *   }, [])
  *
  *   return <div>
  *
  *   <div ref={ref}>
  *     <div ref={childRef}>{text}</div>
  *   </div>
  *
  *     changes to the DOM:
  *     {JSON.stringify(mutation)}
  *
  *   </div>
  * }
  *
  * ```
  */
export const useMutationObserver = (
  Default?: MutationRecord,
  /**
    * [Initialization options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
    * for the [[MutationObserver]], used to filter the kinds of mutation events observed.
    */
  options?: MutationObserverInit
): [MutationRecord | undefined, callbackRef] => useObserver(MutationObserver)(Default, options)






