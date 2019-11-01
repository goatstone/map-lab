import React, { useState } from 'react'
import Map from './Map'

function App() {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 49.8419,
    lng: 24.0315,
  })
  const { lat, lng } = markerPosition

  function moveMarker() {
    setMarkerPosition({
      lat: lat + 0.0001,
      lng: lng + 0.0001,
    })
  }

  return (
    <div>
      <Map
        markerPosition={markerPosition}
      />
      <div>
        Current markerPosition: lat:
        {' '}
        {lat}
        , lng:
        {' '}
        {lng}
      </div>
      <button
        type="button"
        onClick={moveMarker}
      >
        Move marker
      </button>
    </div>
  )
}

export default App
