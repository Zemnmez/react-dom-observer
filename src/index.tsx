/**
 * @module react-observer-hook
 */

/**
 *
 */

import * as React from 'react'
import { ResizeObserverEntry, ResizeObserver } from 'resize-observer-browser' // @types/resize-observer-browser


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
 * An Observer represents a generic Observer API,
 * such as an [[IntersectionObserver]], [[MutationObserver]]
 * or [[ResizeObserver]].
 *
 * though there is a clear common interface between
 * Observer APIs, there's actually no formal definition
 * I can find anywhere of what an Observer API is
 * and actually conforms to, so I made this up...
 * @hidden
 */
export interface Observer<EntriesType extends ReadonlyArray<EntryType>, EntryType extends { target: Node }, OptionsType> {
	new(
	  callback: (entries: EntriesType, originator?: ObserverImpl<EntriesType>) => void,
	  options?: OptionsType
	) : ObserverImpl<EntriesType>
}

/**
 * @hidden
 */
export interface ObserverImpl<EntriesType extends ReadonlyArray<{ target: Node }>> {
	  /**
	   * Clears all observed targets of this [[Observer]].
	   * Effectively a destructor.
	   */
	  disconnect: () => void,


	  /**
	   * Starts observing an element.
	   */
	  observe: (e: Node, options: any) => void,

	  /**
	   * Stops observing an Node.
	   * [[MutationObserver]], specifically does not have an `unobserve`
	   * function.
	   */
	  unobserve?: (e: Node) => void,

	  /**
	   * the function of `takeRecords()` is a little confusing,
	   * and tied to the implementation of an [[Observer]].
	   * Internally, an [[Observer]] maintains a list of observation
	   * events, but may not fire them immediately.
	   *
	   * When `takeRecords()` is called, it returns all observation
	   * events which have not yet fired a callback. Records
	   * received by this method do *not* propagate to their normal
	   * callbacks.
	   *
	   * I see this as being useful for two things: (1) forcing, at
	   * some point, the observer to tell you the current state of the
	   * world and (2) using an IntersectionObserver in a non-callback
	   * focused way.
	   *
	   * The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/takeRecord) note that if you use this method you "don't need"
	   * to set a callback, which would imply it's intended as an alternate,
	   * polling based mode for the Observer API.
	   */
	  takeRecords?: () => EntriesType
  }

/**
 * @hidden
 */
type useObserveRef<EntryType extends { target: Node }> = (Default?: EntryType, options?: any) => [EntryType | undefined, callbackRef]

/**
 * @see https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
 * @hidden
 */
type callbackRef = (element: Node) => void

/**
 * useObserver is a low-level API for using
 * an API conforming to the [[Observer]] interface.
 *
 * It wraps a generic [[Observer]], producing a [[useObserveRef]]
 * which can bind React refs to the [[Observer]].
 *
 * In virtually all cases, you should use [[useMutationObserver]],
 * [[useIntersectionObserver]] or [[useResizeObserver]] instead.
 * @hidden
 */
export const useObserver =
  <EntriesType extends ReadonlyArray<EntryType>, EntryType extends { target : Node }, OptionsType>(
  o: Observer<EntriesType, EntryType, OptionsType>,
  options?: OptionsType):
  useObserveRef<EntriesType[0]> => {

  // oh boy. the weak map.
  // in essence, as well as being reversible,
  // a weak map allows its keys to be GC'd
  // this should mean that callbacks we add
  // to this callback mapping get automatically
  // gc'd along with the element when the element
  // is destroyed by react.
  //
  // otherwise, we'd annoyingly have to keep tabs
  // on when elements go in and out of existence.
  const elementToCallback = React.useMemo(() => new WeakMap(), []);

  const callback = React.useCallback((entries: EntriesType) =>
	entries.forEach((entry: EntriesType[0]) =>
		elementToCallback.get(entry.target)(entry)
	)
  , []);

  const observer = React.useMemo(() => new o(callback, options), [])

  // calling this essentially
  // creates a new ref and binds it
  return (Default?: EntriesType[0], options?: any) => {
    const [entry, setEntry] = React.useState<EntriesType[0] | undefined>(Default);

    return [entry, React.useCallback((element: Node) => {
		// here we could potentially use the element going null
        // to unobserve the previously observed ref. however,
		// i dont see any documentation indicating that
		// an observer observing an element that no longer exists
		// is any kind of issue, so we might as well just leave it
		if (element === null) return;

		elementToCallback.set(element, setEntry)
		observer.observe(element, options)
	}, [])]
  }
}


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
 * [mdn: ResizeObserver]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 * [mdn: ResizeObserverEntry]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
 *
 * @example
 * ```javascript
 * const ruler = () => {
 *   const [{ width, height }, addRef] = useResizeObserver()
 *   return <div ref={addRef()}> width: {width}, height: {height}</div>
 * ```
 */
export const useResizeObserver = (
  Default?: ResizeObserverEntry
): [ResizeObserverEntry | undefined, callbackRef] => useObserver(ResizeObserver)(Default)

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
  */
export const useMutationObserver = (
  Default?: MutationRecord,
  /**
    * [Initialization options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
    * for the [[MutationObserver]], used to filter the kinds of mutation events observed.
    */
  options?: MutationObserverInit
): [MutationRecord | undefined, callbackRef] => useObserver(MutationObserver)(Default, options)

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
  */
export const useIntersectionObserver = (
  /**
    * [Initialization options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#Parameters)
    * for the [[IntersectionObserver]]. The important ones are `root`, specifying the root element, and `threshold`, specifying the
    * different amounts of intersection which should generate an event.
    */
  options?: IntersectionObserverInit
) => useObserver(IntersectionObserver, options)
