/**
 * @module react-observer-hook
 */

import { Observer, useObserveRef } from './declarations'
import * as React from 'react'

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
  <EntriesType extends ReadonlyArray<EntryType>, EntryType extends { target : Node }, OptionsType>( o: Observer<EntriesType, EntryType, OptionsType>, options?: OptionsType): useObserveRef<EntriesType[0]> => {

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
    const elementToCallback:
    WeakMap<Node, (setState: EntriesType[0]|undefined) => void> =
      React.useMemo(() => new WeakMap(), []);

  const callback = React.useCallback((entries: EntriesType) =>
	entries.forEach((entry: EntriesType[0]) =>
		 (elementToCallback.get(entry.target)
		   || (()=>{}))(entry)
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
    }, [])];
  }
}






