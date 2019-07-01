> **[react-observer-hook](README.md)**

[Globals]() / [react-observer-hook](README.md) /

### Index

#### Type aliases

* [ClientRect](README.md#clientrect)
* [DOMRect](README.md#domrect)
* [IntersectionObserverEntry](README.md#intersectionobserverentry)
* [IntersectionObserverInit](README.md#intersectionobserverinit)
* [ResizeObserverEntry](README.md#resizeobserverentry)
* [callbackRef](README.md#callbackref)

#### Functions

* [useIntersectionObserver](README.md#const-useintersectionobserver)
* [useMutationObserver](README.md#const-usemutationobserver)

## Type aliases

###  ClientRect

Ƭ **ClientRect**: *object*

Defined in declarations.tsx:9

A [ClientRect](README.md#clientrect) represents the bounding box of the client (i.e. window)
of the browser.

#### Type declaration:

* **bottom**: *number*

* **height**: *number*

* **left**: *number*

* **right**: *number*

* **top**: *number*

* **width**: *number*

___

###  DOMRect

Ƭ **DOMRect**: *object*

Defined in declarations.tsx:21

A [DOMRect](README.md#domrect) represents the bounding box of an Element.

#### Type declaration:

* **height**: *number*

* **width**: *number*

* **x**: *number*

* **y**: *number*

___

###  IntersectionObserverEntry

Ƭ **IntersectionObserverEntry**: *object*

Defined in declarations.tsx:32

[IntersectionObserverEntry](README.md#intersectionobserverentry) represents the information given by
an intersection event from a [useIntersectionObserver](README.md#const-useintersectionobserver)

#### Type declaration:

* **boundingClientRect**: *[ClientRect](README.md#clientrect) | [DOMRect](README.md#domrect)*

* **intersectionRatio**: *number*

* **intersectionRect**: *[ClientRect](README.md#clientrect) | [DOMRect](README.md#domrect)*

* **isIntersecting**: *boolean*

* **rootBounds**: *[ClientRect](README.md#clientrect) | [DOMRect](README.md#domrect)*

* **target**: *`Element`*

* **time**: *number*

___

###  IntersectionObserverInit

Ƭ **IntersectionObserverInit**: *object*

Defined in declarations.tsx:67

[IntersectionObserverInit](README.md#intersectionobserverinit) are the initialization configuration options
for [useIntersectionObserver](README.md#const-useintersectionobserver).

> rootMargin

A string which specifies a set of offsets to add
to the root's bounding_box when calculating intersections,
effectively shrinking or growing the root for calculation purposes.

The syntax is approximately the same as that for the CSS `margin` property.
The default is "0px 0px 0px 0px"

> threshold

Either a single number or an array of numbers between 0.0 and 1.0,
specifying a ratio of intersection area to total bounding box area
for the observed target. A value of 0.0 means that even a single visible
pixel counts as the target being visible. 1.0 means that the entire
target element is visible. The default is a threshold of 0.0.

 @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#Parameters

#### Type declaration:

* **root**? : *`Element` | undefined*

* **rootMargin**? : *undefined | string*

* **threshold**? : *number | number[]*

___

###  ResizeObserverEntry

Ƭ **ResizeObserverEntry**: *object*

Defined in declarations.tsx:150

#### Type declaration:

* **contentRect**: *`DOMRectReadOnly`*

* **target**: *`Element`*

___

###  callbackRef

Ƭ **callbackRef**: *function*

Defined in declarations.tsx:142

**`see`** https://reactjs.org/docs/refs-and-the-dom.html#callback-refs

#### Type declaration:

▸ (`element`: *`Node`*): *void*

**Parameters:**

Name | Type |
------ | ------ |
`element` | `Node` |

## Functions

### `Const` useIntersectionObserver

▸ **useIntersectionObserver**(`options?`: *[IntersectionObserverInit](README.md#intersectionobserverinit)*): *function*

Defined in useIntersectionObserver.tsx:74

[useIntersectionObserver](README.md#const-useintersectionobserver) is a React hook exposing the functionality of the
[IntersectionObserver][mdn: IntersectionObserver] API, which is an efficient way to
tell when an element becomes visible within some viewport, which could be
the parent window, or the containing element.

This function returns a factory function, which when called returns two values in an array:

1. An [IntersectionObserverEntry][mdn: IntersectionObserverEntry], or `undefined` representing
details on how the children were modified.

2. A [React ref][react docs: react ref] that you can pass in the `ref={}`
parameter to any elements you want to track child changes for.

This factory type construction allows you to pass your useIntersectionObserver value
any number to children that you want to intersect with you.

[mdn: IntersectionObserver]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver "MDN docs: IntersectionObserver"
[mdn: IntersectionObserverEntry]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry "MDN docs: IntersectionObserverEntry"
[react docs: react ref]: https://reactjs.org/docs/refs-and-the-dom.html "React Docs: Refs and the DOM"

#### example [useIntersectionObserver](example/src/useIntersectionObserver.js)

```javascript
import React from 'react'
import { useIntersectionObserver } from 'react-observer-hook'

export default () => {
  const [{
    bindingClientRect: { width, height },
    intersectionRatio,
    intersectionRect,
    isIntersecting,
    rootBounds,
    target,
    time
  }, ref] = useResizeObserver()

  return <React.Fragment>
    <textarea ref={ref}>
      Resize me!!
  </textarea>
  <table> <thead><tr><td>param,</td><td>value</td></tr></thead>
  <tbody>
      {Object.entries({
        width, height, intersectionRatio, intersectionRect,
        isIntersecting, rootBounds, target, time
      }).map(([k,v]) => <tr><td>{k}</td><td>{v}</td></tr>)}
  </tbody></table>
  </React.Fragment>

}

```

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [IntersectionObserverInit](README.md#intersectionobserverinit) |

**Returns:** *function*

▸ (): *[[IntersectionObserverEntry](README.md#intersectionobserverentry) | undefined, [callbackRef](README.md#callbackref)]*

___

### `Const` useMutationObserver

▸ **useMutationObserver**(`Default?`: *`MutationRecord`*, `options?`: *`MutationObserverInit`*): *[`MutationRecord` | undefined, [callbackRef](README.md#callbackref)]*

Defined in useMutationObserver.tsx:52

[useMutationObserver](README.md#const-usemutationobserver) is a React hook exposing the functionality of the
[MutationObserver][mdn: MutationObserver] API, which is an efficient way to
tell when the children of an element changes.

This function returns two values in an array:

1. A [MutationRecord][mdn: MutationRecord], or `undefined` representing
details on how the children were modified.

2. A [React ref][react docs: react ref] that you can pass in the `ref={}`
parameter to any elements you want to track child changes for.

[mdn: MutationObserver]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver "MDN docs: MutationObserver"
[mdn: MutationRecord]: https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord "MDN docs: MutationRecord"
[react docs: react ref]: https://reactjs.org/docs/refs-and-the-dom.html "React Docs: Refs and the DOM"

#### example [useMutationObserver](example/src/useMutationObserver.js)

```javascript
import React from 'react'
import { useMutationObserver } from 'react-observer-hook'

export default () => {
  const [mutation, ref] = useMutationObserver()
  const childRef = React.useRef()
  const [text, setText] = React.useState("example")
  React.useEffect(() => {
    window.setTimeout(() => setText("text2"), 1000)
  }, [])

  return <div>

  <div ref={ref}>
    <div ref={childRef}>{text}</div>
  </div>

    changes to the DOM:
    {JSON.stringify(mutation)}

  </div>
}

```

**Parameters:**

Name | Type |
------ | ------ |
`Default?` | `MutationRecord` |
`options?` | `MutationObserverInit` |

**Returns:** *[`MutationRecord` | undefined, [callbackRef](README.md#callbackref)]*
