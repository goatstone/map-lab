import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '@googlemaps/loader'
import config from '../config'

const GMap = ({
  mapControl,
  mapStatusActions,
  mainClassName,
}) => {
  useEffect(() => {
    const loader = new Loader({
      apiKey: config.gMapAPIKey,
      version: 'weekly',
      libraries: [],
    })
    const mapOptions = {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 4,
    }
    loader
      .load()
      .then(() => {
        // eslint-disable-next-line
        const map = new window.google.maps.Map(document.getElementById("map"), mapOptions)
        map.setCenter({ lat: 43, lng: -120 })

        // set init status values
        mapStatusActions.zoomLevel(map.getZoom())
        const center = map.getCenter()
        const centerArr = Object.entries(center).map(e => e[1]())
        mapStatusActions.center(centerArr)

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
    console.log('map control', mapControl)
  }, [mapControl])

  return (
    <div
      id="map"
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
  // center: PropTypes.array.isRequired,
  mainClassName: PropTypes.string.isRequired,
}

export default GMap
