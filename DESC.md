# Abstract
This package provides type checked React hooks for the observer APIs. The Observer APIs are efficient, browser supported ways
of querying changes to an element's size, position, visibility and changes over time. It should be easy to
use this package to react to these changes without complicated state management or performance downsides.

The types used to typecheck this package are imported from the mainline typescript DefinitelyTyped libraries.
If these APIs change in a way that no longer conforms to these definitions, the package should stop building
rather than create subtle run time errors.

| export | purpose | API  |
|--------|---------|------|
| [[useIntersectionObserver]] | Detect when an element becomes all or partially visible or invisible and is scrolled into view | [IntersectionObserver][mdn: IntersectionObserver] |
| [[useResizeObserver]] | Detect when an element changes size (due to CSS or otherwise) | [ResizeObserver][mdn: ResizeObserver] |
| [[useMutationObserver]] | Detect when the children of an element are modified | [MutationObserver][mdn: MutationObserver] |

[mdn: IntersectionObserver]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "Mozilla Developer Network: IntersectionObserver"
[mdn: MutationObserver]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver "Mozilla Developer Network: MutationObserver"
[mdn: ResizeObserver]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver "Mozilla Developer Network: ResizeObserver"
