import React, { useState, useEffect } from 'react'
import useMap from '../use-map'
import Map from './Map'

function App() {
  const lat = 47.6
  const lng = -122.3
  const [markerPosition, moveMarker] = useMap({ lat, lng })
  const [center, setCenter] = useState([lat, lng])
  // engine
  const [isRunnningEngine, setEngine] = useState(true)
  function intervalEngine(intervalCallback) {
    return () => {
      intervalCallback()
    }
  }

  const engine = intervalEngine(() => {
    const moveOffset = [0.001, 0.001]
    moveMarker(moveOffset)
    setCenter(currCenter => {
      const newCenter = [...currCenter]
      const a = newCenter.map((cdim, i) => cdim + moveOffset[i])
      return a
    })
  })
  const maximumIntervals = 100
  const intervalSeconds = 1000
  useEffect(() => {
    let interval = null
    if (isRunnningEngine) {
      let engineCount = 1
      interval = setInterval(() => {
        engineCount += 1
        engine()
        if (engineCount > maximumIntervals) {
          // clearInterval is called in componentWillUnmount return call
          // ending the setInterval call
          setEngine(false)
        }
      }, intervalSeconds)
    }
    // equivalent of calling componentWillUnmount in a React Class component.
    return () => clearInterval(interval)
  }, [isRunnningEngine])

  return (
    <div>
      {isRunnningEngine ? 'T' : 'F'}
      <button
        type="button"
        onClick={() => setEngine(!isRunnningEngine)}
      >
        set engine
      </button>
      <button
        type="button"
        onClick={() => setCenter([47.6, -122])}
      >
        set center
      </button>
      <Map
        markerPosition={markerPosition}
        center={center}
      />
      <div>
        Current markerPosition: lat:
        {markerPosition.lat}
        , lng:
        {markerPosition.lng}
      </div>
      <button
        type="button"
        onClick={() => {
          const i = Math.floor(Math.random() * 90)
          moveMarker(i, 20)
        }}
      >
        Move marker
      </button>
    </div>
  )
}

export default App
