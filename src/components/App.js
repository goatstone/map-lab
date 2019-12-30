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
  const [mapStatus, setMapStatus] = useState(
    {
      center: initLatLng,
      zoomLevel: 12,
      viewPortRadius: 50000, // calculated from zoomLevel
    },
  )
  // values for actions on the map
  // mapControl .moveCenter moveMarker .
  const [centerPanMapTo, setCenterPanMapTo] = useState(initLatLng)
  const [markerPosMoveTo, setMarkerPosMoveTo] = useState(initLatLng)
  // places query
  const [setPlaceQuery, placeInfo] = useSearch(mapStatus.center, mapStatus.viewPortRadius)
  const [placeFocusId, setPlaceFocusId] = useState(null)
  // engine
  const [isRunningEngine, setEngine, tick] = useEngine(mapStatus.center, mapStatus.viewPortRadius)

  useEffect(() => {
    const moveOffset = [0.001, 0.001]
    setMarkerPosMoveTo(postion => [
      postion[0] + moveOffset[0],
      postion[1] + moveOffset[1],
    ])
    setCenterPanMapTo(([lat, lng]) => [lat + 0.01, lng + 0.01])
  }, [tick])

  return (
    <section className={sheet.classes.mainContainer}>
      <Map
        centerPanMapTo={centerPanMapTo}
        markerPosition={markerPosMoveTo}
        center={mapStatus.center} // control?????? !!!!!
        placeInfo={placeInfo}
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
      >
        <MoveTo
          setCenterPanMapTo={setCenterPanMapTo}
          moveMarker={setMarkerPosMoveTo}
        />
      </DrawerContainer>
      <DrawerContainer
        yPosition={150}
        alignX={DrawerAlign.RIGHT}
        title="Motion"
        width={100}
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
