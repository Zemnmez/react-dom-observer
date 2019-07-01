import React from 'react'
import { useResizeObserver } from 'react-observer-hook'

export default () => {
  const [{ contentRect: { width, height } }, ref] = useResizeObserver({
    contentRect: {width:0, height:0}
  })


  return <textarea ref={ref}>
      Resize me!!

      Width: {width}; Height: {height}
    </textarea>
}
