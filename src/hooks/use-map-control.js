import { useState } from 'react'

function useMapControl(initConfig = {
  moveCenterTo: [0, 0],
  moveMarkerTo: [0, 0],
  placeFocusId: null,
}) {
  // Control Hook, used to control the map
  // [ mapControl, actions ] = useMapControl({})
  const [mapControl, setMapControl] = useState(initConfig)
  const actions = { // mapControlActions
    setMoveCenterBy: moveOffset => (
      setMapControl(c => Object.assign({}, c, {
        moveCenterTo: [
          c.moveCenterTo[0] + moveOffset[0],
          c.moveCenterTo[1] + moveOffset[1],
        ],
      }))
    ),
    setMoveCenterTo: centerTo => (
      setMapControl(c => Object.assign({}, c, {
        moveCenterTo: centerTo,
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
    setPlaceFocusId: focusId => (
      setMapControl(control => Object.assign({}, control, {
        placeFocusId: focusId,
      }))
    ),
  }
  return [mapControl, actions]
}

export default useMapControl
