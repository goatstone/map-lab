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

const BingMap = ({ config }) => {
  const url = `https://www.bing.com/api/maps/mapcontrol?callback=GetBingMap&key=${config.bingAPIKey}`
  let map
  // eslint-disable-next-line
  window.GetBingMap = () => {
    // eslint-disable-next-line
    map = new window.Microsoft.Maps.Map('#bing-map', {});
    map.setOptions({ customMapStyle: sampleStyle })
  }
  useEffect(() => {
    const node = document.createElement('script')
    node.src = url
    document.getElementById('bing-map').appendChild(node)
  }, [])

  return (
    <div id="bing-map">&nbsp;</div>
  )
}
/* eslint-disable react/forbid-prop-types */
BingMap.propTypes = {
  config: PropTypes.object.isRequired,
}

export default BingMap
