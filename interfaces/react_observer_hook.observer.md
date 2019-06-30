> **[react-observer-hook](../README.md)**

[Globals]() / [react-observer-hook](../README.md) / [Observer](react_observer_hook.observer.md) /

# Interface: Observer <**EntryType, OptionsType**>

An Observer represents a generic Observer API,
such as an [[IntersectionObserver]], [[MutationObserver]]
or [[ResizeObserver]].

though there is a clear common interface between
Observer APIs, there's actually no formal definition
I can find anywhere of what an Observer API is
and actually conforms to, so I made this up...

## Type parameters

▪ **EntryType**: *object*

▪ **OptionsType**

## Hierarchy

* **Observer**

### Index

#### Constructors

* [constructor](react_observer_hook.observer.md#constructor)

## Constructors

###  constructor

\+ **new Observer**(`callback`: *function*, `options?`: *[OptionsType]()*): *object*

*Defined in [index.tsx:33](https://github.com/Zemnmez/react-dom-observer/blob/04c56ef/src/index.tsx#L33)*

**Parameters:**

▪ **callback**: *function*

▸ (`entries`: *`ReadonlyArray<EntryType>`*, `originator?`: *[Observer](react_observer_hook.observer.md)‹*`EntryType`*, *`OptionsType`*›*): *void*

**Parameters:**

Name | Type |
------ | ------ |
`entries` | `ReadonlyArray<EntryType>` |
`originator?` | [Observer](react_observer_hook.observer.md)‹*`EntryType`*, *`OptionsType`*› |

▪`Optional`  **options**: *[OptionsType]()*

**Returns:** *object*

* **disconnect**(): *function*

  * (): *void*

* **observe**(): *function*

  * (`e`: *`Element`*): *void*

* **takeRecords**? : *undefined | function*

* **unobserve**? : *undefined | function*