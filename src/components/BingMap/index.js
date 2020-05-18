import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const sampleStyle = {
  elements: {
    park: { fillColor: '#A9A9D4BE' },
    controlledAccessHighway: {
      fillColor: '#e6c317',
      strokeColor: '#D3B300',
      labelColor: '#444444',
      labelOutlineColor: '#60ffffff',
    },
    highway: {
      fillColor: '#e6c317',
      strokeColor: '#D3B300',
      labelColor: '#444444',
      labelOutlineColor: '#60ffffff',
    },
    water: { fillColor: '#B7CDDE' },
    medicalBuilding: { fillColor: '#fceced' },
    majorRoad: { fillColor: '#f0d85a' },
    education: { fillColor: '#f0e8f8' },
    arterialRoad: { fillColor: '#ffed91' },
    structure: { fillColor: '#faf8ed' },
    buildinglobal: { fillColor: '#e5e0d8' },
    forest: { fillColor: '#deebdd' },
    vegetation: { fillColor: '#deebdd' },
    reserve: { fillColor: '#deebdd' },
    street: { fillColor: '#ffffff', strokeColor: '#e6e3df' },
    roadShield: { fillColor: '#ffffff' },
    medical: { fillColor: '#ffddee' },
    educationBuildinglobal: { fillColor: '#f6f0f1' },
    golfCourse: { fillColor: '#c5dabb' },
  },
  settings: { landColor: '#F6F4E3' },
}

const BingMap = ({ config, control }) => {
  const url = `https://www.bing.com/api/maps/mapcontrol?callback=GetBingMap&key=${config.bingAPIKey}`
  let map
  // eslint-disable-next-line
  window.GetBingMap = () => {
    // eslint-disable-next-line
    map = new window.Microsoft.Maps.Map('#bing-map', {
      // eslint-disable-next-line
      center: new window.Microsoft.Maps.Location(...control.center),
      // eslint-disable-next-line
      mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
      zoom: control.zoom.bingmap,
      showLocateMeButton: false,
      disableStreetside: true,
      disableBirdseye: true,
    })
    map.setOptions({ customMapStyle: sampleStyle })
  }
  useEffect(() => {
    const node = document.createElement('script')
    node.src = url
    document.getElementById('bing-map').appendChild(node)
  }, [])
  const callerId = 9000
  useEffect(() => {
    // prevent calls from self to used in control !!!!
    const isControllable = (control.callerId !== callerId && map)
    if (isControllable) {
      // map.setCenter({ lat: control.center[0], lng: control.center[1] })
    }
  }, [control.center])

  return (
    <div id="bing-map">&nbsp;</div>
  )
}
/* eslint-disable react/forbid-prop-types */
BingMap.propTypes = {
  config: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
}

export default BingMap
