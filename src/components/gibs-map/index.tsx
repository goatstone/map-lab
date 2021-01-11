import React, { useEffect } from 'react'
import './bingmap.css'

declare global {
  interface Window { Microsoft: any, GetBingMap: any }
}
declare const window: Window

let map: any
let url: any
const seattle = [47.6062, -122.3321]

const GibsMap = ({
  config,
}: { config: any }) => {
  url = `https://www.bing.com/api/maps/mapcontrol?callback=GetBingMap&key=${config.bingAPIKey}`
  window.GetBingMap = () => {
    map = new window.Microsoft.Maps.Map('#bing-map', {
      center: new window.Microsoft.Maps.Location(...seattle),
      mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
      zoom: 6,
      showLocateMeButton: false,
      disableStreetside: true,
      disableBirdseye: true,
      // disableKeyboardInput: true,
      showZoomButtons: false,
      showMapTypeSelector: false,
      showScalebar: false,
      allowHidingLabelsOfRoad: true,
      showMapLabels: false,
    })
    const tileSource = new window.Microsoft.Maps.TileSource({
      uriConstructor: (tile: any) => `https://map1.vis.earthdata.nasa.gov/wmts-geo/MODIS_Terra_CorrectedReflectance_TrueColor/default/2014-07-09/EPSG4326_250m/${tile.zoom}/${tile.y}/${tile.x}.jpg`,
      minZoom: 1,
      maxZoom: 16,
    })
    const layer = new window.Microsoft.Maps.TileLayer({
      mercator: tileSource,
      opacity: 0.75,
    })
    map.layers.insert(layer)
  }
  useEffect(() => {
    const node = document.createElement('script')
    node.src = url
    const el = document.getElementById('bing-map')
    if (el) {
      el.appendChild(node)
    }
  }, [])

  return (
    <div id="bing-map">&nbsp;</div>
  )
}

export default GibsMap
