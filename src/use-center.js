import { useState } from 'react'

function useCenter(initCenter = [0, 0]) {
  const [mapCenter, setCenter] = useState(initCenter)
  const moveCenterBy = (offset = [0, 0]) => {
    setCenter(currentPosition => ([
      currentPosition[0] + offset[0],
      currentPosition[1] + offset[1],
    ]))
  }
  const moveCenterTo = (newCenter = [0, 0]) => {
    setCenter(newCenter)
  }
  return [mapCenter, moveCenterBy, moveCenterTo]
}

export default useCenter
