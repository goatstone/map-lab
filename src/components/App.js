import React, { useState, useEffect } from 'react'
import useMap from '../use-map'
import useCenter from '../use-center'
import Map from './Map'
import './App.css'

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
    <section data-id="app">
      <section data-id="information">
        <article>
          Engine is&nbsp;
          {isRunnningEngine ? 'Running' : 'Not Running'}
        </article>
        <article>
          Map&nbsp;Center:&nbsp;
          latitude:
          &nbsp;
          {mapCenter[0].toFixed(8)}
          &nbsp;longitude:
          &nbsp;
          {mapCenter[1].toFixed(8)}
        </article>
      </section>
      <section data-id="control">
        <button
          type="button"
          onClick={() => {
            moveMarker([0.001, 0.001])
          }}
        >
          Move Marker By 0.01
        </button>
        <button
          type="button"
          onClick={() => moveCenterBy([0.01, 0.01])}
        >
          Move Center by 0.01
        </button>
        <button
          type="button"
          onClick={() => moveCenterTo(initLatLng)}
        >
          move center to:&nbsp;
          {initLatLng[0]}
          &nbsp;:&nbsp;
          {initLatLng[1]}
        </button>
        <button
          type="button"
          onClick={() => setEngine(!isRunnningEngine)}
        >
          {!isRunnningEngine ? 'Start Engine' : 'Stop Engine'}
        </button>

      </section>
      <Map
        markerPosition={markerPosition}
        center={mapCenter}
      />
    </section>
  )
}

export default App
