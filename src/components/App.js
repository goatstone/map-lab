import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jss from 'jss'
import preset from 'jss-preset-default'
import Map from './Map'
import './App.css'
import Search from './Search'
import DisplayResults from './DisplayResults'
import './DisplayResults.css'
import DrawerContainer, { DrawerAlign } from './DrawerContainer'
import GoToPlace from './GoToPlace'
import MoveTo from './MoveTo'
import Motion from './Motion'
import style from '../style/main-style'

jss.setup(preset())

const sheet = jss.createStyleSheet(style)
sheet.attach()

const initLatLng = [47.6, -122.3]
function App() {
  // values that reflect map state
  const [mapCenter, setMapCenter] = useState(initLatLng)
  // const [mapMarkerPos, setMapMarkerPos] = useState(initLatLng) // TODO : use later for info
  const [mapZoomLevel, setMapZoomLevel] = useState(12)

  // values for actions on the map
  const [centerPanMapTo, setCenterPanMapTo] = useState(initLatLng)
  const [markerPosMoveTo, setMarkerPosMoveTo] = useState(initLatLng)

  // search
  const [searchQRadius, setSearchQMapRadius] = useState(0)
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
      const url = `${servers.remote}/places?q=${placeQuery}&latlng=${mapCenter}&radius=${searchQRadius}`
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
    setMarkerPosMoveTo(postion => [
      postion[0] + moveOffset[0],
      postion[1] + moveOffset[1],
    ])
    setCenterPanMapTo(([lat, lng]) => [lat + 0.01, lng + 0.01])
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
    const metresPerPixel = Math.round(40075016.686 * Math.abs(Math.cos(mapCenter[0] * Math.PI / 180)) / Math.pow(2, mapZoomLevel + 8))
    const newRadius = Math.min(150 * metresPerPixel, 50000)
    setSearchQMapRadius(newRadius)
  }, [mapZoomLevel])

  return (
    <section data-id="app">
      <Map
        centerPanMapTo={centerPanMapTo}
        markerPosition={markerPosMoveTo}
        center={mapCenter}
        placeInfo={placeInfo}
        setSearchQCenter={setMapCenter}
        setZoomLevel={setMapZoomLevel}
        placeFocusId={placeFocusId}
      />
      <DrawerContainer
        yPosition={0}
        alignX={DrawerAlign.LEFT}
        title="Search"
        initIsOpen
        classNames={sheet.classes}
      >
        <Search
          placeQueryInput={placeQueryInput}
          setPlaceQueryInput={setPlaceQueryInput}
          setPlaceQuery={setPlaceQuery}
        />
        {placeInfo
          && (
            <DisplayResults
              placeInfo={placeInfo}
              setPlaceFocusId={setPlaceFocusId}
            />
          )}
      </DrawerContainer>
      <DrawerContainer
        yPosition={0}
        alignX={DrawerAlign.RIGHT}
        title="Go To"
        initIsOpen
      >
        <GoToPlace
          setCenterPanMapTo={setCenterPanMapTo}
        />
      </DrawerContainer>
      <DrawerContainer
        yPosition={50}
        alignX={DrawerAlign.RIGHT}
        title="Move To"
      >
        <MoveTo
          setCenterPanMapTo={setCenterPanMapTo}
          moveMarker={setMarkerPosMoveTo}
        />
      </DrawerContainer>
      <DrawerContainer
        yPosition={125}
        alignX={DrawerAlign.RIGHT}
        title="Motion"
      >
        <Motion
          isRunnningEngine={isRunnningEngine}
          setEngine={setEngine}
        />
      </DrawerContainer>
    </section>
  )
}

export default App
