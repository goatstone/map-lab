import React, { useState, useEffect } from 'react'
import useMap from '../use-map'
import Map from './Map'

function App() {
  const [markerPosition, moveMarker] = useMap({ lat: 43, lng: 122 })
  // engine
  const [isRunnningEngine, setEngine] = useState(true)

  function engine(count) {
    return () => {
      if (count < 10) {
        moveMarker()
      }
      // eslint-disable-next-line
      count += 1
    }
  }
  const eng = engine(0)
  const maximumIntervals = 20
  const intervalSeconds = 1000
  useEffect(() => {
    let interval = null
    // eslint-disable-next-line
    let engineCount = 1
    if (isRunnningEngine) {
      interval = setInterval(() => {
        engineCount += 1
        eng()
        if (engineCount > maximumIntervals) {
          clearInterval(interval)
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
      <Map
        markerPosition={markerPosition}
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
