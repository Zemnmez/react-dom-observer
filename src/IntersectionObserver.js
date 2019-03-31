import React from 'react';
import PropTypes from 'prop-types';
import childRefManager from './ChildRefManager';
import * as _ from 'intersection-observer';
import { Set, Map } from 'immutable';

const hurl = (error) => { throw new Error(error) }

export class IntersectionObserver extends React.PureComponent {
  static propTypes = {
    render: PropTypes.func,
    thresholds: PropTypes.arrayOf(PropTypes.number),
    rootMargin: PropTypes.string,
    target: PropTypes.shape({ // ref
        current: PropTypes.instanceOf(Element)
      }),
  }

  constructor(props) {
    super(props)

    this.refManager = new childRefManager();

    this.Provider = this.Provider.bind(this);
    this.Internals = this.refManager.Internals;
    this.Intersection = this.Intersection.bind(this);
  }

  Provider({ target, children, rootMargin, thresholds }) {
    const { refManager } = this;
    return <IntersectionObserverProvider {...{
      refManager, target, children, rootMargin, thresholds
    }}/>
  }

  Intersection({ render }) {
    const { refManager } = this;
    return <IntersectionObserverIntersection {...{
      render,
      refManager,
    }}/>
  }

  render() {
    const { render, target, rootMargin, thresholds, ...etc } = this.props;
    if (!render) throw 'render prop must be provided to render this component directly';
    const { Provider, Internals, Intersection } = this;
    return <Provider {...{
        target, thresholds, rootMargin, ...etc
      }}>

      {render({ Internals, Intersection })}
    </Provider>
  }
}

const refManager = new childRefManager();
export const IntersectionInternals = refManager.Internals;
const IntersectionObserverProvider = ({ refManager, target = React.createRef(), children, rootMargin, thresholds }) => {

  return <refManager.Provider>
    <refManager.Internals {...{
      render: ({ elemsToRefs, refsToElems, refsToCallbacks }) =>
        <IntersectionObserverManager {...{
          children: new Set(refsToElems.values()),
          thresholds,
          parent: target,
          elemsToRefs,
          refsToElems,
          rootMargin,
          refsToCallbacks
        }}/>
    }}/>

    {target instanceof Window?
      children:
      React.cloneElement(
        React.Children.only(children),
        { ref: target },
      )}

  </refManager.Provider>


}

export class IntersectionObserverManager extends React.PureComponent {
  static propTypes = {
    elemsToRefs: PropTypes.instanceOf(Map).isRequired,
    refsToCallbacks: PropTypes.instanceOf(Map).isRequired,
    children: PropTypes.instanceOf(Set).isRequired,
    rootMargin: PropTypes.string,
    thresholds: PropTypes.arrayOf(PropTypes.number),
    parent: PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    }).isRequired
  }

  componentDidMount() {
    const { parent, children, thresholds, rootMargin } = this.props;
    this.observer = new window.IntersectionObserver(
      (...args) => this.observed(...args), {
        root: parent.current,
        threshold: thresholds,
        rootMargin
      }
    );


    children.forEach(elem =>
      this.observer.observe(elem)
    );
  }


  observed(IntersectionObserverEntries) {
    const { elemsToRefs, refsToCallbacks } = this.props;

    [...IntersectionObserverEntries].forEach((IntersectionObserverEntry) =>
      refsToCallbacks.get(elemsToRefs.get(IntersectionObserverEntry.target))
        (IntersectionObserverEntry)
    );
  }

  componentWillUnmount() {
    this.observer = this.observer.disconnect();
  }

  componentDidUpdate(oldProps) {
    const [ Old, New ] = [
      oldProps.children,
      this.props.children
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

class IntersectionObserverIntersection extends React.PureComponent {
  static propTypes = {
    render: PropTypes.func.isRequired,
    refManager: PropTypes.shape({
      Tracker: PropTypes.any
    }).isRequired
  }

  render() {
    const { render, refManager, children } = this.props;
    return <refManager.Tracker {...{
      render: (IntersectionObserverEntry = {}) =>
        render(IntersectionObserverEntry),
      children,
    }}/>
  }
}
