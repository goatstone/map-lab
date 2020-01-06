import React, { useState, useEffect } from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import axios from 'axios'
import Map from './Map'
import Search from './Search'
import DisplayResults from './DisplayResults'
import DrawerContainer from './DrawerContainer'
import DCConfig from '../draw-container-config'
import GoToPlace from './GoToPlace'
import MoveTo from './MoveTo'
import Motion from './Motion'
import style from '../style/main-style'
import useEngine from '../hooks/use-engine'

jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()
const initLatLng = [47.6, -122.3]

function App() {
  // Status Hook : values for the current state of the map
  const [mapStatus, setMapStatus] = useState(
    {
      center: initLatLng,
      zoomLevel: 12,
      viewPortRadius: 5000, // calculated from zoomLevel
    },
  )
  // Control Hook, used to control the map
  const [mapControl, setMapControl] = useState({
    moveCenterTo: initLatLng,
    moveMarkerTo: initLatLng,
    placeFocusId: null,
  })
  const actions = {
    setMoveCenterBy: moveOffset => (
      setMapControl(c => Object.assign({}, c, {
        moveCenterTo: [
          c.moveCenterTo[0] + moveOffset[0],
          c.moveCenterTo[1] + moveOffset[1],
        ],

      }))
    ),
    setMoveMarkerBy: moveOffset => (
      setMapControl(c => Object.assign({}, c, {
        moveMarkerTo: [
          c.moveMarkerTo[0] + moveOffset[0],
          c.moveMarkerTo[1] + moveOffset[1],
        ],

      }))
    ),
  }

  // places query: A search consists of a query object and searchResults
  const [searchResults, setSearchResults] = useState({
    query: null,
    message: null,
    results: null,
  })
  const [query, setQuery] = useState({
    query: 'truck',
    radius: 50000,
    center: initLatLng,
    server: 'https://map-server-goatstone.appspot.com',
  })
  useEffect(() => {
    const server = 'https://map-server-goatstone.appspot.com';
    (async () => {
      // make a call to the backend with data from the request
      const pI = await axios({
        method: 'get',
        url: `${server}/places?`,
        params: {
          query: query.query,
          location: query.center,
          radius: query.radius,
        },
      })
      // set up the new search results based on what has been retrieved from the server
      const newSearchResults = {
        query: query.query,
        message: '',
        results: pI.data,
      }
      setSearchResults(newSearchResults)
    })()
  }, [query])

  // engine
  const [isRunningEngine, setEngine, tick] = useEngine(mapStatus.center, mapStatus.viewPortRadius)
  useEffect(() => {
    const moveOffset = [0.001, 0.001]
    actions.setMoveCenterBy(moveOffset)
    actions.setMoveCenterBy(moveOffset)
  }, [tick])

  return (
    <section className={sheet.classes.mainContainer}>
      <Map
        placeInfo={searchResults}
        mapControl={mapControl}
        setMapStatus={setMapStatus}
      />
      <DrawerContainer
        {...DCConfig.search}
        classNames={sheet.classes}
      >
        <Search
          initSearchValue="food"
          radius={mapStatus.viewPortRadius}
          center={mapStatus.center}
          setPlaceQuery={setQuery}
        />
        {searchResults && searchResults.results
          && (
            <DisplayResults
              placeInfo={searchResults}
              setMapControl={setMapControl}
              classNames={sheet.classes}
            />
          )}
      </DrawerContainer>
      <DrawerContainer
        {...DCConfig.goToPlace}
      >
        <GoToPlace
          setMapControl={setMapControl}
        />
      </DrawerContainer>
      <DrawerContainer
        {...DCConfig.moveTo}
      >
        <MoveTo
          setMapControl={setMapControl}
        />
      </DrawerContainer>
      <DrawerContainer
        {...DCConfig.motion}
      >
        <Motion
          isRunnningEngine={isRunningEngine}
          setEngine={setEngine}
        />
      </DrawerContainer>
    </section>
  )
}

export default App
