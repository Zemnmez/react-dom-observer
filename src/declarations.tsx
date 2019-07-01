/**
 * @module react-observer-hook
 */

/**
 * A [[ClientRect]] represents the bounding box of the client (i.e. window)
 * of the browser.
 */
export declare type ClientRect = {
    bottom: number;
    readonly height: number;
    left: number;
    right: number;
    top: number;
    readonly width: number;
}

/**
 * A [[DOMRect]] represents the bounding box of an Element.
 */
export declare type DOMRect = {
    height: number;
    width: number;
    x: number;
    y: number;
}

/**
 * [[IntersectionObserverEntry]] represents the information given by
 * an intersection event from a [[useIntersectionObserver]]
 */
export declare type IntersectionObserverEntry = {
    readonly boundingClientRect: ClientRect | DOMRect;
    readonly intersectionRatio: number;
    readonly intersectionRect: ClientRect | DOMRect;
    readonly isIntersecting: boolean;
    readonly rootBounds: ClientRect | DOMRect;
    readonly target: Element;
    readonly time: number;
}


/**
* [[IntersectionObserverInit]] are the initialization configuration options
* for [[useIntersectionObserver]].
*
 * > rootMargin
 *
 * A string which specifies a set of offsets to add
 * to the root's bounding_box when calculating intersections,
 * effectively shrinking or growing the root for calculation purposes.
 *
 * The syntax is approximately the same as that for the CSS `margin` property.
 * The default is "0px 0px 0px 0px"
 *
 * > threshold
 *
 * Either a single number or an array of numbers between 0.0 and 1.0,
 * specifying a ratio of intersection area to total bounding box area
 * for the observed target. A value of 0.0 means that even a single visible
 * pixel counts as the target being visible. 1.0 means that the entire
 * target element is visible. The default is a threshold of 0.0.
 *
 *  @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#Parameters
 *
 */
export declare type IntersectionObserverInit = {
    root?: Element | undefined;
    rootMargin?: string;
    threshold?: number | number[];
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
 * @see https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
 */
export type callbackRef = (element: Node) => void


/**
 * @hidden
 */
export type useObserveRef<EntryType extends { target: Node }> = (Default?: EntryType, options?: any) => [EntryType | undefined, callbackRef]

export declare type ResizeObserverEntry = {
    readonly target: Element;
    readonly contentRect: DOMRectReadOnly;
}

/**
 * [[DOMRectReadOnly]] is the read-only variant of
 * [[DOMRect]]. It represents the bounding box of
 * an element.
 *
 * this has super weird collisions i dont know how to fix
export declare type DOMRectReadOnly = {
    readonly bottom: number;
    readonly height: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
}
 */

