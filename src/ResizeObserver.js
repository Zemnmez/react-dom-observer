import React from 'react';
import propTypes from 'prop-types';
import resizeObserver from 'resize-observer-polyfill';
import childRefManager from './ChildRefManager';
import { Set, Map } from 'immutable';


const hurl = (error) => { throw new Error(error) }


const refManager = new childRefManager();
export const ResizeInternals = refManager.Internals;
export const ResizeObserver = ({ children }) => <refManager.Provider>
  <refManager.Internals {...{
    render: ({ elemsToRefs, refsToElems, refsToCallbacks }) =>
      <ResizeObserverManager {...{
        elems: new Set(refsToElems.values()),
        elemsToRefs,
        refsToElems,
        refsToCallbacks
      }}/>
  }}/>

  {children}

</refManager.Provider>

//ResizeObserver manager is used to track adds /
//removals of elements to track.
class ResizeObserverManager extends React.PureComponent {
  static propTypes = {
    elemsToRefs: propTypes.instanceOf(Map).isRequired,
    refsToCallbacks: propTypes.instanceOf(Map).isRequired,
    elems: propTypes.instanceOf(Set).isRequired
  }

  componentDidMount() {
    this.observer = new resizeObserver(
      (...args) => this.resized(...args)
    );

    this.props.elems.forEach(elem =>
      this.observer.observe(elem)
    );
  }


  resized(sizes) {
    const { elemsToRefs, refsToCallbacks } = this.props;

    [...sizes].forEach((ResizeEntry) =>
      refsToCallbacks.get(elemsToRefs.get(ResizeEntry.target))
        (ResizeEntry)
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

    console.log({props: this.props});
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

export class Size extends React.PureComponent {
  static propTypes = {
    render: propTypes.func.isRequired
  }

  render() {
    const { render } = this.props;
    return <refManager.Tracker {...{
      render: (ResizeObserverEntry = { contentRect: {} }) =>
          (console.log(ResizeObserverEntry),render(ResizeObserverEntry.contentRect))
    }}/>
  }
}
