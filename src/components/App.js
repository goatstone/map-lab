import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useMap from '../use-map'
import useCenter from '../use-center'
import Map from './Map'
import './App.css'

function App() {
  const initLatLng = [47.6, -122.3]
  const [searchQCenter, setSearchQCenter] = useState(initLatLng)
  const [zoomLevel, setZoomLevel] = useState(12)
  const [searchQRadius, setSearchQMapRadius] = useState(0)
  const [markerPosition, moveMarker] = useMap(initLatLng)
  const [mapCenter, moveCenterBy, moveCenterTo] = useCenter(initLatLng)
  const [placeQueryInput, setPlaceQueryInput] = useState('')
  const [placeQuery, setPlaceQuery] = useState('')
  const [placeInfo, setPlaceInfo] = useState(null)
  useEffect(() => {
    if (placeQuery === '') return () => 1
    const placeInfoPacket = {
      q: placeQuery,
      message: '',
      results: [],
    };
    (async () => {
      // get these values from the map so the results are framed in the map
      const servers = {
        local: 'http://localhost:8080',
        remote: 'https://map-server-goatstone.appspot.com',
      }
      const url = `${servers.remote}/places?q=${placeQuery}&latlng=${searchQCenter}&radius=${searchQRadius}`
      const pI = await axios(url)
      placeInfoPacket.message = pI.data[0].name
      placeInfoPacket.results = pI.data
      setPlaceInfo(placeInfoPacket)
    })()
    return () => 1
  }, [placeQuery])
  // engine
  const [isRunnningEngine, setEngine] = useState(false)
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
  useEffect(() => {
    // eslint-disable-next-line
    const metresPerPixel = Math.round(40075016.686 * Math.abs(Math.cos(searchQCenter[0] * Math.PI / 180)) / Math.pow(2, zoomLevel + 8))
    const newRadius = Math.min(150 * metresPerPixel, 50000)
    setSearchQMapRadius(newRadius)
  }, [zoomLevel])
  return (
    <section data-id="app">
      <Map
        markerPosition={markerPosition}
        center={mapCenter}
        placeInfo={placeInfo}
        setSearchQCenter={setSearchQCenter}
        setZoomLevel={setZoomLevel}
      />
      <section data-id="info-control-container">

        <section data-id="information">
          {placeInfo && (
            <article>
              Search Query:
              {
                ` ${placeInfo.q} : ${placeInfo.message} `
              }
            </article>
          )}

          <article>
            Map&nbsp;Center:&nbsp;
            latitude:
            &nbsp;
            {mapCenter[0].toFixed(4)}
            &nbsp;longitude:
            &nbsp;
            {mapCenter[1].toFixed(4)}
          </article>
        </section>
        <section data-id="control">
          <fieldset>
            <legend>
              Place Search
            </legend>
            <input
              data-id="search-place"
              value={placeQueryInput}
              onChange={e => setPlaceQueryInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setPlaceQuery(placeQueryInput)}
            >
              Search
            </button>
          </fieldset>
          <fieldset>
            <legend>
              Go To
            </legend>
            <button
              type="button"
              onClick={() => moveCenterTo([47.6, -122.3])}
            >
              Seattle
            </button>
          </fieldset>
          <fieldset>
            <legend>
              Move Marker
            </legend>

            <button
              type="button"
              onClick={() => {
                moveMarker([0.001, 0.001])
              }}
            >
              &#x279A;
            </button>
          </fieldset>

          <fieldset>
            <legend>
              Move Map
            </legend>
            <button
              type="button"
              onClick={() => moveCenterBy([0.01, 0.01])}
            >
              &#x279A;
            </button>
          </fieldset>

          <fieldset>
            <legend>
              Motion
            </legend>
            <button
              type="button"
              data-id="start-stop"
              onClick={() => setEngine(!isRunnningEngine)}
            >
              {!isRunnningEngine ? <span>&#x2771;</span> : <span>&#x2751;</span>}
            </button>
          </fieldset>

        </section>
      </section>

    </section>
  )
}

export default App
