import React, { useEffect } from 'react'
import './bingmap.css'
import { gibsImageServiceUrl, gibs } from './gibs'

declare global {
  interface Window { Microsoft: any, GetBingMap: any }
}
declare const window: Window

let map: any
let url: any
const seattle = [47.6062, -122.3321]

const GibsMap = ({
  config,
  product,
}: { config: any, product: string }) => {
  // const [s, setS] = useState('a')
  url = `https://www.bing.com/api/maps/mapcontrol?callback=GetBingMap&key=${config.bingAPIKey}`
  window.GetBingMap = () => {
    map = new window.Microsoft.Maps.Map('#bing-map', {
      center: new window.Microsoft.Maps.Location(...seattle),
      mapTypeId: window.Microsoft.Maps.MapTypeId.canvasDark,
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
      labelOverlay: window.Microsoft.Maps.LabelOverlay.hidden,
    })
    const tileSource = new window.Microsoft.Maps.TileSource({
      uriConstructor: (tile: any) => gibsImageServiceUrl(
        tile,
        gibs.products.MODIS_Terra_CorrectedReflectance_Bands367.value,
        '2011-07-10',
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
    const el = document.getElementById('bing-map')
    if (el) {
      el.appendChild(node)
    }
    // setS('a')
    // setTimeout(() => setS('b'), 5000)
  }, [])
  useEffect(() => {
    if (map) {
      const tileSource = new window.Microsoft.Maps.TileSource({
        uriConstructor: (tile: any) => gibsImageServiceUrl(
          tile,
          product,
          '2011-07-10',
        ),
        minZoom: 1,
        maxZoom: 16,
      })
      const layer = new window.Microsoft.Maps.TileLayer({
        mercator: tileSource,
        opacity: 0.7,
      })
      map.layers.insert(layer)
      //   const center = new window.Microsoft.Maps.Location(...[45.00, -122.00])
      // map.setView({ center })
    }
  }, [product])
  return (
    <div id="bing-map">&nbsp;</div>
  )
}

export default GibsMap
