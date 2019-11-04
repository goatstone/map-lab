import React, { useState, useEffect } from 'react'
import useMap from '../use-map'
import useCenter from '../use-center'
import Map from './Map'

function App() {
  const initLatLng = [47.6, -122.3]
  const [markerPosition, moveMarker] = useMap(initLatLng)
  const [mapCenter, moveCenterBy, moveCenterTo] = useCenter(initLatLng)

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
    moveCenterBy(moveOffset)
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
      {mapCenter[0]}
      <button
        type="button"
        onClick={() => moveCenterBy([0.01, 0.01])}
      >
        move center by
      </button>
      <button
        type="button"
        onClick={() => moveCenterTo(initLatLng)}
      >
        move center to
      </button>
      <button
        type="button"
        onClick={() => setEngine(!isRunnningEngine)}
      >
        set engine
      </button>
      {/* <button
        type="button"
        onClick={() => setCenter([47.6, -122])}
      >
        set center
      </button> */}
      <Map
        markerPosition={markerPosition}
        center={mapCenter}
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
          moveMarker([0.001, 0.001])
        }}
      >
        Move marker
      </button>
    </div>
  )
}

export default App
