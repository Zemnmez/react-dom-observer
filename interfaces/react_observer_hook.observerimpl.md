> **[react-observer-hook](../README.md)**

[Globals]() / [react-observer-hook](../README.md) / [ObserverImpl](react_observer_hook.observerimpl.md) /

# Interface: ObserverImpl <**EntriesType**>

## Type parameters

▪ **EntriesType**: *`ReadonlyArray<object>`*

## Hierarchy

* **ObserverImpl**

### Index

#### Properties

* [disconnect](react_observer_hook.observerimpl.md#disconnect)
* [observe](react_observer_hook.observerimpl.md#observe)
* [takeRecords](react_observer_hook.observerimpl.md#optional-takerecords)
* [unobserve](react_observer_hook.observerimpl.md#optional-unobserve)

## Properties

###  disconnect

• **disconnect**: *function*

*Defined in [index.tsx:46](https://github.com/Zemnmez/react-dom-observer/blob/04c56ef/src/index.tsx#L46)*

Clears all observed targets of this [[Observer]].
Effectively a destructor.

#### Type declaration:

▸ (): *void*

___

###  observe

• **observe**: *function*

*Defined in [index.tsx:52](https://github.com/Zemnmez/react-dom-observer/blob/04c56ef/src/index.tsx#L52)*

Starts observing an element.

#### Type declaration:

▸ (`e`: *`Node`*, `options`: *any*): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | `Node` |
`options` | any |

___

### `Optional` takeRecords

• **takeRecords**? : *undefined | function*

*Defined in [index.tsx:81](https://github.com/Zemnmez/react-dom-observer/blob/04c56ef/src/index.tsx#L81)*

the function of `takeRecords()` is a little confusing,
and tied to the implementation of an [[Observer]].
Internally, an [[Observer]] maintains a list of observation
events, but may not fire them immediately.

When `takeRecords()` is called, it returns all observation
events which have not yet fired a callback. Records
received by this method do *not* propagate to their normal
callbacks.

I see this as being useful for two things: (1) forcing, at
some point, the observer to tell you the current state of the
world and (2) using an IntersectionObserver in a non-callback
focused way.

The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/takeRecord) note that if you use this method you "don't need"
to set a callback, which would imply it's intended as an alternate,
polling based mode for the Observer API.

___

### `Optional` unobserve

• **unobserve**? : *undefined | function*

*Defined in [index.tsx:59](https://github.com/Zemnmez/react-dom-observer/blob/04c56ef/src/index.tsx#L59)*

Stops observing an Node.
[[MutationObserver]], specifically does not have an `unobserve`
function.