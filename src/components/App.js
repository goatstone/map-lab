import React, { useState, useEffect } from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
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
import useSearch from '../hooks/use-search'

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
  // places query: A search consists of a query object and searchResults
  const initQuery = {
    query: '',
    radius: 50000,
    center: [0, 0],
    server: 'https://map-server-goatstone.appspot.com',
  }
  const [setQuery, searchResults] = useSearch(initQuery)
  // engine
  const [isRunningEngine, setEngine, tick] = useEngine(mapStatus.center, mapStatus.viewPortRadius)

  useEffect(() => {
    const moveOffset = [0.001, 0.001]
    setMapControl(config => (
      Object.assign({}, config, {
        moveCenterTo:
          [
            config.moveCenterTo[0] + moveOffset[0],
            config.moveCenterTo[1] + moveOffset[1],
          ],
        moveMarkerTo: [
          config.moveMarkerTo[0] + moveOffset[0],
          config.moveMarkerTo[1] + moveOffset[1],
        ],
      })
    ))
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
