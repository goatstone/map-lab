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
  control,
  statusDispatch,
  mainClassName,
  idName = 'leaflet-map',
  controlId,
}) {
  const resetZoomLevel = 9
  const mapRef = useRef(null)
  const userMoveListener = function (ev) {
    statusDispatch({
      type: 'center',
      center: [mapRef.current.getCenter().lat, mapRef.current.getCenter().lng],
      callerId: controlId,
    })
  }
  useEffect(() => {
    mapRef.current = L.map(idName, {
      center: control.center,
      zoom: resetZoomLevel,
      zoomControl: false,
      layers: [
        grayscale, streets,
      ],
      scrollWheelZoom: false,
      keyboard: false,
    })
    // capture only user map chage to dispatch status
    mapRef.current.on('mousedown', e => {
      mapRef.current.on('move', userMoveListener)
    })
    mapRef.current.on('mouseup', () => {
      mapRef.current.off('move')
    })
    mapRef.current.off('dblclick')
    mapRef.current.off('doubleClickZoom')
    mapRef.current.off('move')
  }, [])
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(control.center)
    }
  }, [control.center])
  useEffect(() => {
    mapRef.current.setZoom(control.zoom)
  }, [control.zoom])

  return (
    <div
      id={idName}
      data-id="goatstone-component-leaflet-map"
      className={mainClassName}
    />
  )
}

export default Map
