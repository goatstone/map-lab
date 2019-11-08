import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import './Map.css'

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
function Map({ markerPosition, center = [0, 0], placeInfo }) {
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
  // place search markers
  const placeMarkerRefs = Array.from(Array(20)).map(() => useRef(null))
  useEffect(
    () => {
      if (!placeInfo) return
      placeInfo.results.forEach((el, i) => {
        if (placeMarkerRefs[i].current) {
          placeMarkerRefs[i].current.setLatLng(
            [el.geometry.location.lat, el.geometry.location.lng]
          )
        } else {
          const placeIcon = L.icon({
            iconUrl: el.icon,
            iconSize: [25, 25],
          })
          placeMarkerRefs[i].current = L.marker(
            [el.geometry.location.lat, el.geometry.location.lng],
            { icon: placeIcon }
          ).addTo(mapRef.current).bindPopup(el.name)
        }
      })
    },
    [placeInfo],
  )
  // center positions
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(center)
    }
  }, [center])
  return (
    <div id="map" data-id="leaflet-map" />
  )
}

export default Map
