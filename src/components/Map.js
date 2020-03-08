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
  placeInfo,
  mapControl,
  mapStatusActions,
  mainClassName,
}) {
  const idName = 'leaflet-map'

  const mapRef = useRef(null)
  useEffect(() => {
    mapRef.current = L.map(idName, {
      center: mapControl.moveCenterTo,
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

    // set mapStatus based on map events occuring
    mapRef.current.on('moveend', function (ev) {
      mapStatusActions.center(
        [mapRef.current.getCenter().lat, mapRef.current.getCenter().lng]
      )
    })
    mapRef.current.on('zoom', (z) => {
      // eslint-disable-next-line
      const zoomLevel = mapRef.current.getZoom()
      const metresPerPixel = Math.round(40075016.686 * Math.abs(Math.cos(mapRef.current.getCenter().lat * Math.PI / 180)) / Math.pow(2, zoomLevel + 8))
      const viewPortRadius = Math.min(150 * metresPerPixel, 50000)
      mapStatusActions.viewPortRadius(viewPortRadius)
    })
  }, [])
  // marker
  const markerRef = useRef(null)
  // place search markers : expects 20 or less results
  const placeMarkerRefs = [...Array(20)].map(() => useRef(null))
  useEffect(
    () => {
      if (!placeInfo || !placeInfo.results) return
      placeMarkerRefs
        .filter(el => el.current)
        .forEach(el => el.current.remove())
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
  useEffect(() => {
    // pop up
    if (placeMarkerRefs && mapControl.placeFocusId) {
      placeMarkerRefs.map(pmr => pmr.current.closeTooltip())
      placeMarkerRefs.map(pmr => pmr.current.closePopup())
      placeMarkerRefs[mapControl.placeFocusId].current.openTooltip()
    }
    // map move
    if (mapRef.current) {
      mapRef.current.panTo(mapControl.moveCenterTo)
    }
    // marker move
    if (markerRef.current) {
      markerRef.current.setLatLng(mapControl.moveMarkerTo)
    } else {
      markerRef.current = L.marker(mapControl.moveMarkerTo).addTo(mapRef.current)
    }
  }, [mapControl])

  return (
    <div
      id={idName}
      data-id="goatstone-component-leaflet-map" 
      className={mainClassName}
    />
  )
}

export default Map
