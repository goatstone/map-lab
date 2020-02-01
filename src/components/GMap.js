import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '@googlemaps/loader'

const GMap = ({ center, mainClassName }) => {
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyA2LL0mG791RCw9iaRpZvSwg6yJJFnwRWE',
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
        new window.google.maps.Map(document.getElementById("map"), mapOptions);
      })
      .catch(e => {
        throw new Error(`Library Not Loaded ${e}`)
      })
  }, [])

  return (
    <div
      id="map"
      className={mainClassName}
      data-component-name="gmap"
    >
      GMap
      {center}
    </div>
  )
}

/* eslint-disable react/forbid-prop-types */
GMap.propTypes = {
  center: PropTypes.array.isRequired,
  mainClassName: PropTypes.string.isRequired,
}

export default GMap
