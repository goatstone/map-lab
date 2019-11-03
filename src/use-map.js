import { useState } from 'react'

// const [markerPosition, moveMarker] = useMap({ lat: 43, lng: 122 })
function useMap(initMarkerPosition) {
  const [markerPosition, setMarkerPosition] = useState(initMarkerPosition)
  function moveMarker(offset = [0, 0]) {
    setMarkerPosition(currentPosition => ({
      lat: currentPosition.lat + offset[0],
      lng: currentPosition.lng + offset[1],
    }))
  }
  return [markerPosition, moveMarker]
}

export default useMap
