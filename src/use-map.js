import { useState } from 'react'

// const [markerPosition, moveMarker] = useMap({ lat: 43, lng: 122 })
function useMap() {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 49.8419,
    lng: 24.0315,
  })
  function moveMarker() {
    setMarkerPosition(a => ({
      lat: a.lat,
      lng: a.lng + 0.0001,
    }))
  }
  return [markerPosition, moveMarker]
}

export default useMap
