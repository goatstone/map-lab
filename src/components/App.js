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
          <ul>
            <li>
              Engine is&nbsp;
              {isRunnningEngine ? 'Running' : 'Not Running'}
            </li>
            <ul>

              <li>
                Map&nbsp;Center:&nbsp;
              </li>
              <ul>
                <li>
                  latitude:
                  &nbsp;
                  {mapCenter[0].toFixed(4)}
                </li>
                <li>
                  &nbsp;longitude:
                  &nbsp;
                  {mapCenter[1].toFixed(4)}
                </li>
              </ul>
            </ul>
          </ul>
        </article>
      </section>
      <section data-id="control">
        <fieldset>
          <legend>
            Place Search
          </legend>
          <input
            data-id="search-place"
          />
          <button
            type="button"
          >
            Search
          </button>
        </fieldset>
        <fieldset>
          <legend>
            Move
          </legend>
          <button
            type="button"
            onClick={() => {
              moveMarker([0.001, 0.001])
            }}
          >
            Marker
          </button>
          <button
            type="button"
            onClick={() => moveCenterBy([0.01, 0.01])}
          >
            Center
          </button>
          <button
            type="button"
            onClick={() => moveCenterTo(initLatLng)}
          >
            center to:&nbsp;
            {initLatLng[0]}
            &nbsp;:&nbsp;
            {initLatLng[1]}
          </button>
        </fieldset>
        <fieldset>
          <legend>
            Motion
          </legend>
          <button
            type="button"
            onClick={() => setEngine(!isRunnningEngine)}
          >
            {!isRunnningEngine ? 'Start' : 'Stop'}
          </button>
        </fieldset>

      </section>
      <Map
        markerPosition={markerPosition}
        center={mapCenter}
      />
    </section>
  )
}

export default App
