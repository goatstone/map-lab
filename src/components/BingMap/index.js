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
let map

const BingMap = ({
  config,
  control,
  statusDispatch,
  controlId,
  appService,
}) => {
  const url = `https://www.bing.com/api/maps/mapcontrol?callback=GetBingMap&key=${config.bingAPIKey}`
  let userCenterChangeHangler
  const userCenterChanged = () => {
    const centerArr = Object.entries(map.getCenter())
      .filter(e => e[0] === 'latitude' || e[0] === 'longitude')
      .map(e => e[1])
    statusDispatch({ type: 'center', center: centerArr, callerId: controlId })
    appService.addMessage(`[${centerArr}]`, 10)
  }
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
      showZoomButtons: false,
    })
    map.setOptions({ customMapStyle: sampleStyle })
    // eslint-disable-next-line
    window.Microsoft.Maps.Events.addHandler(map, 'mousedown', function () { 
      // eslint-disable-next-line
      userCenterChangeHangler = window.Microsoft.Maps.Events.addHandler(map, 'viewchange', userCenterChanged)
    })
    // eslint-disable-next-line
    window.Microsoft.Maps.Events.addHandler(map, 'mouseup', function () { 
      // eslint-disable-next-line
      window.Microsoft.Maps.Events.removeHandler(userCenterChangeHangler)
    })
  }
  useEffect(() => {
    const node = document.createElement('script')
    node.src = url
    document.getElementById('bing-map').appendChild(node)
  }, [])
  useEffect(() => {
    if (map) {
      map.setView({
        // eslint-disable-next-line
        center: new window.Microsoft.Maps.Location(...control.center),
      })
    }
  }, [control.center])
  useEffect(() => {
    if (map) {
      map.setView({
        zoom: control.zoom,
      })
    }
  }, [control.zoom])

  return (
    <div id="bing-map">&nbsp;</div>
  )
}
/* eslint-disable react/forbid-prop-types */
BingMap.propTypes = {
  controlId: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  statusDispatch: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  appService: PropTypes.object.isRequired,
}

export default BingMap
