import React from 'react';
import propTypes from 'prop-types';
import { Map } from 'immutable';

export default class childRefManager extends React.PureComponent {
  constructor(props) {
    super(props);

    this.trackerContext = React.createContext();
    this.internalsContext = React.createContext();

    this.Registrar = this.Registrar.bind(this);
    this.Internals = this.Internals.bind(this);
    this.Provider = this.Provider.bind(this);
    this.Tracker = this.Tracker.bind(this);
  }

  Registrar({ children, render }) {
    return <this.trackerContext.Consumer>
      {({ register, unregister }) => render({ register, unregister })}
    </this.trackerContext.Consumer>
  }

  Tracker({ render, callback, children }) {
    return <this.Registrar {...{
      render: ({ register, unregister}) => <ChildTracker {...{
        register, unregister, render, callback
      }}/>
    }}/>
  }

  Internals({ children, render }) {
    return <this.internalsContext.Consumer>
      {({ elemsToRefs, refsToElems, refsToCallbacks }) =>
        render({ elemsToRefs, refsToElems, refsToCallbacks })}
    </this.internalsContext.Consumer>
  }

  Provider({ children, ...etc }) {
    const { trackerContext, internalsContext } = this;
    return <ChildRefManager {...{
      children,
      ...etc,
      trackerContext,
      internalsContext
    }}/>
  }

  render() {
    throw `
this component should not be mounted
    `
  }
}

class ChildRefManager extends React.PureComponent {
  static propTypes = {

    children: propTypes.any,

    trackerContext: propTypes.shape({
      Provider: propTypes.any.isRequired,
      Consumer: propTypes.any.isRequired
    }),


    internalsContext: propTypes.shape({
      Provider: propTypes.any.isRequired,
      Consumer: propTypes.any.isRequired
    }),


  };

  constructor(props) {
    super(props);

    this.state = {
      elemsToRefs: new Map(), /* elem -> ref */
      refsToElems: new Map(),  /* ref -> elem */
      refsToCallbacks: new Map() /* ref -> callback */
    };

    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
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

  render() {
    const { trackerContext, internalsContext, children } = this.props;
    const { refsToElems, elemsToRefs, refsToCallbacks } = this.state;
    const { register, unregister } = this;

    return <trackerContext.Provider {...{
      value: { register, unregister }
    }}>

      <internalsContext.Provider {...{
        value: { refsToElems, elemsToRefs, refsToCallbacks }
      }}>


      {children}


      </internalsContext.Provider>

    </trackerContext.Provider>
  }
}

class ChildTracker extends React.PureComponent {
  static propTypes = {
    render: propTypes.func.isRequired,
    register: propTypes.func.isRequired,
    unregister: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { callbackReturned: [] };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    const { register, unregister } = this.props;

    register( this.myRef, (...callbackReturned) =>
      this.setState(
        () => ({ callbackReturned })
      )
    );
  }

  componentWillUnmount() {
    const { register, unregister } = this.props;

    unregister(this.myRef);
  }

  render() {
    const { callbackReturned } = this.state;
    const { myRef } = this;
    const { render } = this.props;

    return React.cloneElement(
        React.Children.only(render(...callbackReturned)),
        { ref: myRef },
    );
  }
}
