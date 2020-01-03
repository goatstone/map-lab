import React, { useState, useEffect } from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import Map from './Map'
import Search from './Search'
import DisplayResults from './DisplayResults'
import DrawerContainer, { DrawerAlign } from './DrawerContainer'
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
  })

  const [centerPanMapTo, setCenterPanMapTo] = useState(initLatLng)

  // places query
  const [setPlaceQuery, placeInfo] = useSearch(mapStatus.center, mapStatus.viewPortRadius)
  const [placeFocusId, setPlaceFocusId] = useState(null)

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
        centerPanMapTo={centerPanMapTo}
        center={mapStatus.center} // control?????? !!!!!
        placeInfo={placeInfo}
        mapControl={mapControl}
        setMapStatus={setMapStatus}
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
          initSearchValue="food"
          setPlaceQuery={setPlaceQuery}
        />
        {placeInfo
          && (
            <DisplayResults
              placeInfo={placeInfo}
              setPlaceFocusId={setPlaceFocusId}
              classNames={sheet.classes}
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
        title="Move"
        width={180}
        initIsOpen
      >
        <MoveTo
          setMapControl={setMapControl}
        />
      </DrawerContainer>
      <DrawerContainer
        yPosition={150}
        alignX={DrawerAlign.RIGHT}
        title="Motion"
        width={100}
        initIsOpen
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
