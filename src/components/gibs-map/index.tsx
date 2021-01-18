import React, { useEffect } from 'react'
import './bingmap.css'
import { gibsImageServiceUrl, gibs } from './gibs'

declare global {
  interface Window { Microsoft: any, GetBingMapB: any }
}
declare const window: Window

let map: any
let url: any
const seattle = [40.0, 0.0]
const idName = 'gibs-map'

const GibsMap = ({
  config,
  product,
  date,
}: { config: any, product: string, date: string }) => {
  url = `https://www.bing.com/api/maps/mapcontrol?callback=GetBingMapB&key=${config.bingAPIKey}`
  window.GetBingMapB = () => {
    map = new window.Microsoft.Maps.Map(`#${idName}`, {
      center: new window.Microsoft.Maps.Location(...seattle),
      mapTypeId: window.Microsoft.Maps.MapTypeId.canvasDark,
      zoom: 3,
      showLocateMeButton: false,
      disableStreetside: true,
      disableBirdseye: true,
      showZoomButtons: false,
      showMapTypeSelector: false,
      showScalebar: false,
      allowHidingLabelsOfRoad: true,
      showMapLabels: false,
      labelOverlay: window.Microsoft.Maps.LabelOverlay.hidden,
    })
    const tileSource = new window.Microsoft.Maps.TileSource({
      uriConstructor: (tile: any) => gibsImageServiceUrl(
        tile,
        gibs.products.multibandImagery[0].imageLayer,
        date,
      ),
      minZoom: 1,
      maxZoom: 16,
    })
    const layer = new window.Microsoft.Maps.TileLayer({
      mercator: tileSource,
      opacity: 0.7,
    })
    map.layers.insert(layer)
  }
  useEffect(() => {
    const node = document.createElement('script')
    node.src = url
    const el = document.getElementById(idName)
    if (el) {
      el.appendChild(node)
    }
  }, [])
  useEffect(() => {
    if (map) {
      const tileSource = new window.Microsoft.Maps.TileSource({
        uriConstructor: (tile: any) => gibsImageServiceUrl(
          tile,
          product,
          date,
        ),
        minZoom: 1,
        maxZoom: 16,
      })
      const layer = new window.Microsoft.Maps.TileLayer({
        mercator: tileSource,
        opacity: 0.7,
      })
      map.layers.clear()
      map.layers.insert(layer)
    }
  }, [product, date])
  return (
    <div id={idName}>&nbsp;</div>
  )
}

export default GibsMap
