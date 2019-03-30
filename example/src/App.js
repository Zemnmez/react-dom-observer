import React from 'react';

import {
  ResizeObserver,
  Size,
  TrackedElemsContext
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
        <h2 id="resize_observer">ResizeObserver</h2>
        <p> The ResizeObserver API uses a Context to share a polyfilled
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
                value: `Resize me to see me change! ${[width, height].join("x")}`
              }}/>
            }}/>

            <Size {...{
              render: ({width = undefined, height = undefined}) => <div>
                Resize the page to see me change! {" "}
                {[width, height].join("x")}
              </div>
            }}/>
        </ResizeObserver>
      <h3 id="lifecycle">Lifecycle</h3>
      <p>When a child is added or removed, ResizeObserver stops tracking it
      appropriately, which prevents memory leaks over time.</p>
      <ResizeObserver>
        <TrackedElemsContext.Consumer>
          {({ elems }) => `Tracking ${elems.size} DOM elements.`}
        </TrackedElemsContext.Consumer>

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
