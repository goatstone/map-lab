import React from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
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
  console.log(actions)
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
      <StateDebug
        isShow
        mapStatus={mapStatus}
      />
    </section>
  )
}

export default App
