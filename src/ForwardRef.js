import React from 'react';
export default React.forwardRef((ref, { render }) =>
  render(ref));

export const forwardRef = (Component) => React.forwardRef(({ children, ...etc }, ref) => <Component {...{
    children: ref? React.cloneElement(
      React.Children.only(children),
      { ref }
    ): children,
    ...etc
}}/>);

export const forwardRenderRef = (Component) => React.forwardRef(({render, ...etc }, ref) => <Component {...{
  render: ref? (...args) => React.cloneElement(
    React.Children.only(render(args)),
    { ref }
  ): render,
  ...etc
}}/>);
