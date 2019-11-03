import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

const style = {
  width: '100%',
  height: '300px',
}
/* eslint-disable */
function Map({ markerPosition, center = [0, 0] }) {

  const mapRef = useRef(null)
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: center,
      zoom: 12,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    })
  }, [])
  // marker
  const markerRef = useRef(null)
  useEffect(
    () => {
      if (markerRef.current) {
        markerRef.current.setLatLng(markerPosition)
      } else {
        markerRef.current = L.marker(markerPosition).addTo(mapRef.current)
      }
    },
    [markerPosition],
  )
  // center positions
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(center)
    }
  }, [center])
  return (
    <section>
      <div id="map" style={style} />
    </section>
  )
}

export default Map
