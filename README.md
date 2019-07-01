> **[react-observer-hook](README.md)**

[Globals]() / [react-observer-hook](README.md) /

**`requires`** prop-types

**`requires`** react

**`requires`** react-dom

**`summary`** Provides react hooks for the DOM observer APIs that facilitate detecting visibility and resizing of DOM elements.

**`version`** 1.0.0

**`author`** zemnmez

**`copyright`** zemnmez 2019

**`license`** MIT
## Installation

```bash
yarn add react-observer-hook
```
# Abstract
This package provides type checked react hooks for the observer APIs which are efficient, browser supported ways
of querying changes to an element's size, position, visibility and changes over time. It should be easy to
use this package to react to these changes without complicated state management or performance downsides.

The types used to typecheck this package are imported from the mainline typescript DefinitelyTyped libraries.
If these APIs change in a way that no longer conforms to these definitions, the package should stop building
rather than create subtle run time errors.

| export | purpose | API  |
|--------|---------|------|
| [useIntersectionObserver](README.md#const-useintersectionobserver) | Detect when an element becomes all or partially visible or invisible and is scrolled into view | [IntersectionObserver][mdn: IntersectionObserver] |
| [useResizeObserver](README.md#const-useresizeobserver) | Detect when an element changes size (due to CSS or otherwise) | [ResizeObserver][mdn: ResizeObserver] |
| [useMutationObserver](README.md#const-usemutationobserver) | Detect when the children of an element are modified | [MutationObserver][mdn: MutationObserver] |

[mdn: IntersectionObserver]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "Mozilla Developer Network: IntersectionObserver"
[mdn: MutationObserver]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver "Mozilla Developer Network: MutationObserver"
[mdn: ResizeObserver]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver "Mozilla Developer Network: ResizeObserver"

### Index

#### Type aliases

* [IntersectionObserverOptions](README.md#intersectionobserveroptions)

#### Functions

* [useIntersectionObserver](README.md#const-useintersectionobserver)
* [useMutationObserver](README.md#const-usemutationobserver)
* [useResizeObserver](README.md#const-useresizeobserver)

## Type aliases

###  IntersectionObserverOptions

Ƭ **IntersectionObserverOptions**: *object*

*Defined in [index.tsx:233](https://github.com/Zemnmez/react-dom-observer/blob/8f0bb53/src/index.tsx#L233)*

#### Type declaration:

## Functions

### `Const` useIntersectionObserver

▸ **useIntersectionObserver**(`options?`: *[IntersectionObserverOptions](README.md#intersectionobserveroptions)*): *function*

*Defined in [index.tsx:292](https://github.com/Zemnmez/react-dom-observer/blob/8f0bb53/src/index.tsx#L292)*

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
`options?` | [IntersectionObserverOptions](README.md#intersectionobserveroptions) |

**Returns:** *function*

▸ (`Default?`: *`EntryType`*, `options?`: *any*): *[`EntryType` | undefined, `callbackRef`]*

**Parameters:**

Name | Type |
------ | ------ |
`Default?` | `EntryType` |
`options?` | any |

___

### `Const` useMutationObserver

▸ **useMutationObserver**(`Default?`: *`MutationRecord`*, `options?`: *`MutationObserverInit`*): *[`MutationRecord` | undefined, `callbackRef`]*

*Defined in [index.tsx:224](https://github.com/Zemnmez/react-dom-observer/blob/8f0bb53/src/index.tsx#L224)*

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

**Returns:** *[`MutationRecord` | undefined, `callbackRef`]*

___

### `Const` useResizeObserver

▸ **useResizeObserver**(`Default?`: *`ResizeObserverEntry`*): *[`ResizeObserverEntry` | undefined, `callbackRef`]*

*Defined in [index.tsx:175](https://github.com/Zemnmez/react-dom-observer/blob/8f0bb53/src/index.tsx#L175)*

[useResizeObserver](README.md#const-useresizeobserver) is a React hook exposing the functionality of
the [ResizeObserver][mdn: ResizeObserver] API, which is an efficient
way to tell when an element changes size.

The function returns two values in an array.

1. a [ResizeObserverEntry][mdn: ResizeObserverEntry] or `undefined`,
representing the current known size.

2.a React ref you can pass in the `ref={}` parameter to any
elements you want to track the size of.

#### example [useResizeObserver](example/src/useResizeObserver.js)

**Parameters:**

Name | Type |
------ | ------ |
`Default?` | `ResizeObserverEntry` |

**Returns:** *[`ResizeObserverEntry` | undefined, `callbackRef`]*
