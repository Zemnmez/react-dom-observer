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

## Example

**`example`** 

```javascript
import React from 'react'
import { useStorage } from 'react-storage-hook'

export const SavedTextarea = () => {
  const [text, setText] = useStorage('saved-text', {
    placeholder: ""
  });

  const onChange = e => setText(e.target.value);

  return <textarea {...{
    onChange,
    value: text
  }}/>
}
```

### Index

#### Functions

* [useIntersectionObserver](README.md#const-useintersectionobserver)
* [useMutationObserver](README.md#const-usemutationobserver)
* [useResizeObserver](README.md#const-useresizeobserver)

## Functions

### `Const` useIntersectionObserver

▸ **useIntersectionObserver**(`options?`: *`IntersectionObserverInit`*): *function*

*Defined in [index.tsx:289](https://github.com/Zemnmez/react-dom-observer/blob/0f73a11/src/index.tsx#L289)*

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

**Parameters:**

Name | Type |
------ | ------ |
`options?` | `IntersectionObserverInit` |

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

*Defined in [index.tsx:225](https://github.com/Zemnmez/react-dom-observer/blob/0f73a11/src/index.tsx#L225)*

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

**Parameters:**

Name | Type |
------ | ------ |
`Default?` | `MutationRecord` |
`options?` | `MutationObserverInit` |

**Returns:** *[`MutationRecord` | undefined, `callbackRef`]*

___

### `Const` useResizeObserver

▸ **useResizeObserver**(`Default?`: *`ResizeObserverEntry`*): *[`ResizeObserverEntry` | undefined, `callbackRef`]*

*Defined in [index.tsx:175](https://github.com/Zemnmez/react-dom-observer/blob/0f73a11/src/index.tsx#L175)*

[useResizeObserver](README.md#const-useresizeobserver) is a React hook exposing the functionality of
the [ResizeObserver][mdn: ResizeObserver] API, which is an efficient
way to tell when an element changes size.

The function returns two values in an array.

1. a [ResizeObserverEntry][mdn: ResizeObserverEntry] or `undefined`,
representing the current known size.

2.a React ref you can pass in the `ref={}` parameter to any
elements you want to track the size of.

**Parameters:**

Name | Type |
------ | ------ |
`Default?` | `ResizeObserverEntry` |

**Returns:** *[`ResizeObserverEntry` | undefined, `callbackRef`]*
