import React from 'react'
import { useMutationObserver } from 'react-observer-hook'

export default () => {
  const [mutation, ref] = useMutationObserver()
  const childRef = React.useRef()
  const [text, setText] = React.useState("example")
  React.useEffect(() => {
    window.setTimeout(() => setText("text2"), 1000)
  }, [])

  return <div>

  <div ref={ref}>
    <div ref={childRef}>{text}</div>
  </div>

    changes to the DOM:
    {JSON.stringify(mutation)}

  </div>
}
