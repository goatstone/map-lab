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
import StateDebug from './StateDebug'
import style from '../style/main-style'
import useEngine from '../hooks/use-engine'
import useMapControl from '../hooks/use-map-control'
import useMapStatus from '../hooks/use-map-status'

jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()
const initLatLng = [47.6, -122.3]

function App() {
  // Status Hook : values for the current state of the map
  const [mapStatus, mapStatusActions] = useMapStatus({
    center: initLatLng,
    zoomLevel: 12,
    viewPortRadius: 50000,
  })

  // Control Hook, used to control the map
  const [mapControl, actions] = useMapControl({
    moveCenterTo: initLatLng,
    moveMarkerTo: initLatLng,
    placeFocusId: null,
  })

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
    actions.setMoveMarkerBy(moveOffset)
  }, [tick])

  return (
    <section className={sheet.classes.mainContainer}>
      <Map
        placeInfo={searchResults}
        mapControl={mapControl}
        mapStatusActions={mapStatusActions}
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
              setPlaceFocusId={actions.setPlaceFocusId}
              classNames={sheet.classes}
            />
          )}
      </DrawerContainer>
      <DrawerContainer
        {...DCConfig.goToPlace}
      >
        <GoToPlace
          setMoveCenterBy={actions.setMoveCenterTo}
        />
      </DrawerContainer>
      <DrawerContainer
        {...DCConfig.moveTo}
      >
        <MoveTo
          setMoveCenterBy={actions.setMoveCenterBy}
          setMoveMarkerBy={actions.setMoveMarkerBy}
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
      <StateDebug
        mapStatus={mapStatus}
      />
    </section>
  )
}

export default App
