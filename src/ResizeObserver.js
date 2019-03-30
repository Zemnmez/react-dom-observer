import React from 'react';
import PropTypes from 'prop-types';
import resizeObserver from 'resize-observer-polyfill';
import { Set, Map } from 'immutable';

import styles from './styles.css'

const hurl = (error) => { throw new Error(error) }


export const ResizeContext = React.createContext({
  register: (ref, callback) => hurl('missing parent ResizeObserver'),
  unregister: (ref) => hurl('missing parent ResizeObserver'),
  debug: false
});

export const TrackedElemsContext = React.createContext({
  elems: undefined
});


export class ResizeObserver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elemsToRefs: new Map(), /* elem -> ref */
      refsToElems: new Map(),  /* ref -> elem */
      refsToCallbacks: new Map() /* ref -> callback */
    }

    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
    this.resized = this.resized.bind(this);
  }

  register(ref, callback) {
    if (!ref.current) hurl('ref not yet mounted');

    this.setState((state, props) => ({
      elemsToRefs: state.elemsToRefs.set(ref.current, ref),
      refsToElems: state.refsToElems.set(ref, ref.current),
      refsToCallbacks: state.refsToCallbacks.set(ref, callback)
    }));
  }

  unregister(ref) {
    this.setState((state, props) => ({
      elemsToRefs: state.elemsToRefs.delete(
        state.refsToElems.get(ref)
      ),

      refsToElems: state.refsToElems.delete(ref),
      refsToCallbacks: state.refsToCallbacks.delete(ref)
    }));
  }

  resized(sizes) {
    const { refsToCallbacks, elemsToRefs } = this.state;

    [...sizes].forEach((ResizeEntry) =>
      refsToCallbacks.get(elemsToRefs.get(ResizeEntry.target))
        (ResizeEntry)
    );
  }

  render() {
    const {
      register, unregister,
      resized,

      props: { children, debug },
      state: { elemsToRefs }
    } = this;
    return <ResizeContext.Provider {...{
      debug,
      value: {
        register,
        unregister
      }
    }}>
      <TrackedElemsContext.Provider {...{
        value: {
          elems: new Set(elemsToRefs.keys())
        }
      }}>

        <TrackedElemsContext.Consumer>
          {({ elems }) => <ResizeObserverManager {...{
            debug,
            elems,
            callback: resized,
          }}/>}
        </TrackedElemsContext.Consumer>

      {children}

      </TrackedElemsContext.Provider>
    </ResizeContext.Provider>
  }
}

//ResizeObserver manager is used to track adds /
//removals of elements to track.
export class ResizeObserverManager extends React.PureComponent {
  componentDidMount() {
    this.observer = new resizeObserver(
      this.props.callback
    );

    this.props.elems.forEach(elem =>
      this.observer.observe(elem)
    );
  }

  componentWillUnmount() {
    this.observer = this.observer.disconnect();
  }

  componentDidUpdate(oldProps) {
    const [ Old, New ] = [
      oldProps.elems,
      this.props.elems
    ];

    const added = [...New].filter(
      elem => !Old.has(elem)
    );

    added.forEach(
      elem => this.observer.observe(elem)
    );

    const removed = [...Old].filter(
      elem => !New.has(elem)
    );

    removed.forEach(
      elem => this.observer.unobserve(elem)
    );
  }

  render() {
    const { debug, elems } = this.props;
    if (!debug) return "";

    return <React.Fragment>
      Observing {elems.size} DOM Elements {" "}
      {
        elems.map((ref) =>
          ref.toString()
        ).join(" ")
      }
    </React.Fragment>
  }
}

export const Size = ({ ...etc }) => <ResizeContext.Consumer>
  {(ResizeContext) => <SizeManager {...{
    ResizeContext,
    ...etc
  }}/>}
</ResizeContext.Consumer>

class SizeManager extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ObserverEntry: {}
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    const { register, unregister } =
      this.props.ResizeContext;

    register(
      this.myRef,
      ObserverEntry => {
        const { bottom, height, left, right, top, width, x, y }
          = ObserverEntry.contentRect;

        // likely just been unmounted
        if ([bottom, height, left, right, top, width, x, y].every(
            v => v === 0
        )) return;

        this.setState({
          ObserverEntry
        })
      }
    );
  }

  componentWillUnmount() {
    const { register, unregister } =
      this.props.ResizeContext;

    unregister(this.myRef);
  }

  render() {
    const {
      myRef,
      state: {
        ObserverEntry: { contentRect = {} },
      },
      props: { render },
    } = this;

    return React.cloneElement(
        React.Children.only(render(contentRect)),
        { ref: myRef },
    );
  }
}
