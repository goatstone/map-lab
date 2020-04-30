import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '@googlemaps/loader'
import config from '../config'

let map
const GMap = ({
  mapControl,
  mapStatusActions,
  mainClassName,
}) => {
  const idName = 'google-map'

  useEffect(() => {
    const loader = new Loader({
      apiKey: config.gMapAPIKey,
      version: 'weekly',
      libraries: [],
    })
    const mapOptions = {
      center: {
        lat: mapControl.moveCenterTo[0],
        lng: mapControl.moveCenterTo[1],
      },
      zoom: 7,
    }
    loader
      .load()
      .then(() => {
        // eslint-disable-next-line
        map = new window.google.maps.Map(document.getElementById(idName), mapOptions)

        // set init status values
        mapStatusActions.zoomLevel(map.getZoom())
        const center = map.getCenter()
        const centerArr = Object.entries(center).map(e => e[1]())
        mapStatusActions.center(centerArr)

        // set events
        map.addListener('zoom_changed', () => {
          mapStatusActions.zoomLevel(map.getZoom())
        })
        map.addListener('center_changed', () => {
          const centerArr2 = Object
            .entries(map.getCenter())
            .map(e => e[1]())
          mapStatusActions.center(centerArr2)
        })
      })
      .catch(e => {
        throw new Error(`Library Not Loaded ${e}`)
      })
  }, [])
  // mapControl
  useEffect(() => {
    if (!map) return
    map.setCenter({ lat: mapControl.moveCenterTo[0], lng: mapControl.moveCenterTo[1] })
  }, [mapControl.moveCenterTo])
  // places control
  useEffect(() => {
    if (!mapControl.places || !map) return
    mapControl.places.forEach(place => {
      // eslint-disable-next-line
      new window.google.maps.Marker({
        position: place.geometry.location,
        map,
      })
    })
  }, [mapControl.places])

  return (
    <div
      id={idName}
      className={mainClassName}
      data-component-name="gmap"
    >
      GMap
    </div>
  )
}

/* eslint-disable react/forbid-prop-types */
GMap.propTypes = {
  mapControl: PropTypes.object.isRequired,
  mapStatusActions: PropTypes.object.isRequired,
  mainClassName: PropTypes.string.isRequired,
}

export default GMap