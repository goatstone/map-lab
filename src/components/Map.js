import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

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
/* eslint-disable */
function Map({
  placeInfo,
  control,
  statusDispatch,
  mainClassName,
  idName = 'leaflet-map',
}) {
  const callerId = 2
  const mapRef = useRef(null)
  useEffect(() => {
    mapRef.current = L.map(idName, {
      center: control.center,
      zoom: 7,
      layers: [
        grayscale, streets,
      ],
    })
    L.control.zoom({
      position: 'topleft'
    })
    mapRef.current.on('mouseup', function (ev) {
      statusDispatch({
        type: 'center', 
        center: [mapRef.current.getCenter().lat, mapRef.current.getCenter().lng],
        callerId,
      })
    })
    mapRef.current.on('zoom', (z) => {
      // eslint-disable-next-line
      const zoomLevel = mapRef.current.getZoom()
      const metresPerPixel = Math.round(40075016.686 * Math.abs(Math.cos(mapRef.current.getCenter().lat * Math.PI / 180)) / Math.pow(2, zoomLevel + 8))
      const viewPortRadius = Math.min(150 * metresPerPixel, 50000)
    })
  }, [])
  useEffect(() => {
    // prevent calls from self to used in control !!!!
    const isControllable = (control.callerId !== callerId && mapRef.current)
    if (isControllable) {
      mapRef.current.panTo(control.center)
    }
  }, [control])

  return (
    <div
      id={idName}
      data-id="goatstone-component-leaflet-map" 
      className={mainClassName}
    />
  )
}

export default Map
