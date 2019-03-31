# WARNING API CURRENTLY UNSTABLE. PLEASE WAIT FOR A MORE STABLE RELEASE
# react-dom-observer
This package exposes interfaces for reacting to changes in Observer APIs, for example reacting to resizing.

To see a demo, check the [github pages site](//zemnmez.github.io/react-dom-observer).

[![NPM](https://img.shields.io/npm/v/react-dom-observer.svg)](https://www.npmjs.com/package/react-dom-observer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-dom-observer
```

## Usage
### IntersectionObserver
The `IntersectionObserver` component leverages a polyfilled `IntersectionObserver`
to track the visibility of elements relative to each other.

In the simplest case, an `IntersectionObserver` can be used to provide visibility
information from a parent element to its children.

In the following example, we create a short div where the child components are
aware of if they're visible or not relative to the parent element's scroll
space:

```jsx
import { IntersectionObserver } from 'react-dom-observer';

export const Example1 = () => <IntersectionObserver {...{
  thresholds: [0, .25, .5, .75, 1], // update each quarter of exposure
  render: ({ Internals, Intersection }) => <div {...{
    style: { height: "10em", position: "relative", overflowY: "auto" },
  }}>

  {[...Array(20)].map((v, i) => <Intersection {...{
    key: i,
    render: ({ intersectionRatio }) => <div>
      {i+1}. I am {intersectionRatio * 100}% visible!
    </div>
  }}/>)}
}}/>
```

The `Intersection`, and `Internals` parameters are specific to each
`IntersectionObserver`, which allows multiple `IntersectionObserver`s
to track different aspects of different parents without running into each
other.

In this example, we produce the same scroll-aware set of children, but attempt to render them only when visible to the browser window:

```jsx
import { IntersectionObserver} from 'react-dom-observer';

const ScrollTracker = ({ WindowIntersection }) => <IntersectionObserver {...{
  thresholds: [0, .25, .5, .75, 1], // update each quarter of exposure

  render: ({ Internals, Intersection }) => <div {...{
    style: { height: "10em", position: "relative", overflowY: "auto" },
  }}>

  {[...Array(20)].map((v, i) => <Intersection {...{
    key: i,
    render: ({ intersectionRatio }) => <div>
      {i+1}. I am {intersectionRatio * 100}% visible to my parent and
    </div>
  }}/>)}
}}/>

export const Example2 = () => <IntersectionObserver {...{
  thresholds: [0, 1], // visible or invisible
  target: window, // browser window

  render: ({ Intersection: WindowIntersection }) => <div>
    <WindowIntersection {...{
        render: ({ isIntersecting }) =>
          isIntersecting? <ScrollTracker {...{
            WindowIntersection
          }}/> || ""
    }}/>

  </div>
}}/>
```

### ResizeObserver

The `ResizeObserver` component leverages a polyfilled `ResizeObserver`
to track the visibility of elements relative to each other.

A `ResizeObserver` can be used to track the size of a container element so that
React can calculate the necessary pixel-size of internal elements e.g. SVGs.

In the following example, we create a resize-aware `<textarea>`:

```jsx
import { ResizeObserver, Size } from 'react-dom-observer';

export const Example3 = () => <ResizeObserver>

<Size {...{
  render: ({width = undefined, height = undefined}) => <textarea {...{
    value: `Resize me to see me change! ${[width, height].join("x")}`,
    onChange: () => 1
  }}/>
}}/>

</ResizeObserver>

```




## License

MIT © [zemnmez](https://github.com/zemnmez)
