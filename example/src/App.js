import React from 'react';

import {
  ResizeObserver,
  Size,
  ResizeInternals,
  IntersectionObserver
} from 'react-dom-observer';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { hideExampleSizer: false }
    this.myRef = React.createRef();
  }

  render () {
    return (
      <React.Fragment>
        <h1 id="title">react-dom-observer</h1>
        <p> This package exposes interfaces for reacting to changes
        in Observer APIs, for example reacting to resizing. </p>
        <h2 id="intersection_observer">intersectionObserver</h2>
        <p> The intersectionObserver shares a polyfilled IntersectionObserver
        with its children. </p>
        <p> Each IntersectionObserver is unique, and
        it's possible to combine them to check intersection
        vs multiple different parent elements. </p>
        <IntersectionObserver {...{
          thresholds: [0, .25, .5, .75, 1],
          render: ({ Internals, Intersection }) => <div {...{
                style: {
                  height: "10em",
                  position: "relative",
                  overflowY: "auto"
                }
              }}>

              {[...Array(20)].map((v, i) => <Intersection {...{
                key: i,
                render: ({ intersectionRatio }) => <div>
                  {i+1}. hello! I am {(intersectionRatio * 100).toString()}% visible
                </div>
              }}/>)}
          </div>
        }}/>


        <IntersectionObserver {...{
          thresholds: [0, .25, .5, .75, 1],
          target: window,
          render: ({ Internals, Intersection }) => <Intersection {...{
            render: ({ intersectionRatio }) => <div {...{
              style: {
                height: "8em",
                position: "relative"
              }
            }}>
              hello! I am {intersectionRatio * 100}% visible to the main window.
            </div>
          }}/>
        }}/>

        <h2 id="resize_observer">ResizeObserver</h2>
        <p> The ResizeObserver shares a polyfilled
        ResizeObserver between children.</p>
        <ResizeObserver>
            <Size {...{
              render: ({width = undefined, height = undefined}) => <div>
                Resize the page to see me change! {" "}
                {[width, height].join("x")}
              </div>
            }}/>


            <Size {...{
              render: ({width = undefined, height = undefined}) => <textarea {...{
                value: `Resize me to see me change! ${[width, height].join("x")}`,
                onChange: () => 1
              }}/>
            }}/>

            <Size {...{
              render: ({ width = undefined, height = undefined }) => <div>
                Resize the page to see me change! {" "}
                {[width, height].join("x")}
              </div>
            }}/>
        </ResizeObserver>
      <h3 id="lifecycle">Lifecycle</h3>
      <p>When a child is added or removed, ResizeObserver stops tracking it
      appropriately, which prevents memory leaks over time.</p>
      <ResizeObserver>
        <ResizeInternals {...{
          render: ({ elemsToRefs }) =>
            `Tracking ${elemsToRefs.size} DOM elements.`
        }}/>

      <div>
      <a {...{
        onClick: () => {
          let { hideExampleSizer } = this.state;
          this.setState(() => ({hideExampleSizer: !hideExampleSizer}));
        }
      }} >click me to hide an element!</a>
      </div>

      {!this.state.hideExampleSizer&&<Size {...{
          render: ({width = undefined, height = undefined}) => <div>
            Resize the page to see me change! {" "}
            {[width, height].join("x")}
          </div>
        }}/>}

        <Size {...{
          render: ({width = undefined, height = undefined}) => <div>
            Resize the page to see me change! {" "}
            {[width, height].join("x")}
          </div>
        }}/>
      </ResizeObserver>
      </React.Fragment>
    )
  }
}
