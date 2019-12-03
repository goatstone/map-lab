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
const baseMaps = {
  Grayscale: grayscale,
  Streets: streets,
}
/* eslint-disable */
function Map({
  centerPanMapTo,
  markerPosition,
  center = [0, 0],
  placeInfo,
  setSearchQCenter,
  setZoomLevel,
  placeFocusId }) {
  const mapRef = useRef(null)
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: center,
      zoom: 12,
      zoomControl: false,
      layers: [
        grayscale, streets,
      ],
    })

    L.control.zoom({
      position: 'bottomright'
    }).addTo(mapRef.current)
    L.control.layers(null, baseMaps, {
      position: 'bottomright'
    }).addTo(mapRef.current);

    mapRef.current.on('moveend', function (ev) {
      setSearchQCenter([
        mapRef.current.getCenter().lat,
        mapRef.current.getCenter().lng,
      ])
    })
    mapRef.current.on('zoom', (z) => {
      setZoomLevel(mapRef.current.getZoom())
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
  // place search markers : expects 20 or less results
  const placeMarkerRefs = [...Array(20)].map(() => useRef(null))
  useEffect(
    () => {
      if (!placeInfo) return
      if (placeMarkerRefs[0].current) {
        placeMarkerRefs.forEach(el => el.current.remove())
      }
      placeInfo.results.forEach((el, i) => {
        const popupContent = `${el.name} : ${el.formatted_address}`
        const placeIcon = L.icon({
          iconUrl: el.icon || '',
          iconSize: [25, 25],
        })
        placeMarkerRefs[i].current = L.marker(
          [el.geometry.location.lat, el.geometry.location.lng],
          { icon: placeIcon }
        ).addTo(mapRef.current).bindPopup(popupContent)
          .addTo(mapRef.current).bindTooltip(el.name)
      })
    },
    [placeInfo],
  )
  // pan map to
  useEffect(() => {
    if (mapRef.current) {
      // will call the moveend event which will update center value
      mapRef.current.panTo(centerPanMapTo)
    }
  }, [centerPanMapTo])
  useEffect(() => {
    if (placeMarkerRefs && placeFocusId !== null) {
      placeMarkerRefs.map(pmr => pmr.current.closeTooltip())
      placeMarkerRefs.map(pmr => pmr.current.closePopup())
      placeMarkerRefs[placeFocusId].current.openTooltip()
    }
  }, [placeFocusId])

  return (
    <div id="map" data-id="goatstone-component-leaflet-map" />
  )
}

export default Map
