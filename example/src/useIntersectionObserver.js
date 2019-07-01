import React from 'react'
import { useIntersectionObserver } from 'react-observer-hook'

export default () => {
  const [/* rootRef */, useIntersectionChild] = useIntersectionObserver()
  const [{
    bindingClientRect: { width, height },
    intersectionRatio,
    intersectionRect,
    isIntersecting,
    rootBounds,
    target,
    time
  }, ref] = useIntersectionChild()

  return <React.Fragment>
  <table> <thead><tr><td>param,</td><td>value</td></tr></thead>
  <tbody>
      {Object.entries({
        width, height, intersectionRatio, intersectionRect,
        isIntersecting, rootBounds, target, time
      }).map(([k,v]) => <tr><td>{k}</td><td>{v}</td></tr>)}
  </tbody></table>
  </React.Fragment>

}
