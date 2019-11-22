import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useMap from '../use-map'
import useCenter from '../use-center'
import Map from './Map'
import Information from './Information'
import Control from './Control'
import Frame from './Frame'
import './App.css'
import DisplayResults from './DisplayResults'
import './DisplayResults.css'

function App() {
  const initLatLng = [47.6, -122.3]
  const [searchQCenter, setSearchQCenter] = useState(initLatLng)
  const [zoomLevel, setZoomLevel] = useState(12)
  const [searchQRadius, setSearchQMapRadius] = useState(0)
  const [markerPosition, moveMarker] = useMap(initLatLng)
  const [mapCenter, moveCenterBy, moveCenterTo] = useCenter(initLatLng)
  const [placeQueryInput, setPlaceQueryInput] = useState('food')
  const [placeQuery, setPlaceQuery] = useState('')
  const [placeInfo, setPlaceInfo] = useState(null)
  const [placeFocusId, setPlaceFocusId] = useState(null)

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
        placeFocusId={placeFocusId}
      />
      <Frame>
        <Information
          mapCenter={mapCenter}
        />
        <Control
          placeQueryInput={placeQueryInput}
          setPlaceQueryInput={setPlaceQueryInput}
          setPlaceQuery={setPlaceQuery}
          moveCenterBy={moveCenterBy}
          moveCenterTo={moveCenterTo}
          moveMarker={moveMarker}
          isRunnningEngine={isRunnningEngine}
          setEngine={setEngine}
        />
      </Frame>
      {placeInfo
        && (
          <DisplayResults
            placeInfo={placeInfo}
            setPlaceFocusId={setPlaceFocusId}
          />
        )
      }
    </section>
  )
}

export default App
