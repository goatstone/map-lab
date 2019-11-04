import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

const style = {
  width: '100%',
  height: '300px',
}
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
  + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
  + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
const mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ29hdHN0b25lIiwiYSI6ImNrMmp5dnoycjFsazgzYm1zbjE0anRobzkifQ.tW-4mQDJK41ayRkBxtz15w'
const grayscale = L.tileLayer(
  mbUrl,
  {
    id: 'mapbox.light',
    attribution,
  },
)
const streets = L.tileLayer(
  mbUrl,
  {
    id: 'mapbox.streets',
    attribution,
  },
)
const baseMaps = {
  Grayscale: grayscale,
  Streets: streets,
}
/* eslint-disable */
function Map({ markerPosition, center = [0, 0] }) {
  const mapRef = useRef(null)
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: center,
      zoom: 12,
      layers: [
        grayscale, streets,
      ],
    })
    L.control.layers(baseMaps).addTo(mapRef.current);
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
