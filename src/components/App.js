import React, { useState, useEffect } from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import axios from 'axios'
import Search from './Search'
import DisplayResults from './DisplayResults'
import DrawerContainer from './DrawerContainer'
import DrawContainerConfig from '../draw-container-config'
import GoToPlace from './GoToPlace'
import StateDebug from './StateDebug'
import style from '../style/main-style'
import useMapControl from '../hooks/use-map-control'
import useMapStatus from '../hooks/use-map-status'
import GMap from './GMap'
import LMap from './Map'

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
    places: null,
  })

  // places query: A search consists of a query object and searchResults
  const [searchResults, setSearchResults] = useState({
    query: null,
    message: null,
    results: null,
  })
  const [query, setQuery] = useState({
    query: '',
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
      if (Array.isArray(pI.data)) {
        actions.setPlaces(pI.data)
      }
      setSearchResults(newSearchResults)
    })()
  }, [query])

  return (
    <section className={sheet.classes.mainContainer}>
      <GMap
        mainClassName={sheet.classes.gMap}
        mapControl={mapControl}
        mapStatusActions={mapStatusActions}
      />
      <LMap
        mainClassName={sheet.classes.lMap}
        mapControl={mapControl}
        mapStatusActions={mapStatusActions}
      />
      <DrawerContainer
        {...DrawContainerConfig.search}
        classNames={sheet.classes}
      >
        <Search
          initSearchValue=""
          radius={mapStatus.viewPortRadius}
          center={mapStatus.center}
          setPlaceQuery={setQuery}
        />
        {searchResults && Array.isArray(searchResults.results)
          && (
            <DisplayResults
              placeInfo={searchResults}
              setPlaceFocusId={actions.setPlaceFocusId}
              classNames={sheet.classes}
            />
          )}
      </DrawerContainer>
      <DrawerContainer
        {...DrawContainerConfig.goToPlace}
        classNames={sheet.classes}
        initIsOpen={false}
      >
        <GoToPlace
          buttonConfig={[
            ['Seattle', [47.6, -122.3]],
            ['New York', [40.7128, -74.0060]],
            ['Los Angeles', [34.0522, -118.2437]],
          ]}
          setMoveCenterBy={actions.setMoveCenterTo}
        />
      </DrawerContainer>
      <StateDebug
        isShow
        mapStatus={mapStatus}
      />
    </section>
  )
}

export default App
