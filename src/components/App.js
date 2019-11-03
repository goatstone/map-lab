import React, { useState, useEffect } from 'react'
import useMap from '../use-map'
import Map from './Map'

function App() {
  const [markerPosition, moveMarker] = useMap({ lat: 43, lng: 122 })
  // engine
  const [isRunnningEngine, setEngine] = useState(true)
  function intervalEngine(intervalCallback) {
    return () => {
      intervalCallback()
    }
  }

  const maximumIntervals = 10
  const intervalSeconds = 1000
  useEffect(() => {
    let interval = null
    if (isRunnningEngine) {
      let engineCount = 1
      const engine = intervalEngine(() => {
        moveMarker()
      })
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
