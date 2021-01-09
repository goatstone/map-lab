import React, { useEffect } from 'react'
import style from './style'
import { AppServiceInstanceI } from '../../app-service'

declare global {
  interface Window { Microsoft: any, GetBingMap: any }
}
declare const window: Window

let map: any
const BingMap = ({
  config,
  id,
  appService,
}: { config: any, id: number, appService: AppServiceInstanceI }) => {
  const url = `https://www.bing.com/api/maps/mapcontrol?callback=GetBingMap&key=${config.bingAPIKey}`
  let userCenterChangeHangler: any

  useEffect(() => {
    const node = document.createElement('script')
    node.src = url
    const el = document.getElementById('bing-map')
    if (el) {
      el.appendChild(node)
    }
    window.GetBingMap = () => {
      map = new window.Microsoft.Maps.Map('#bing-map', {
        mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
        showLocateMeButton: false,
        disableStreetside: true,
        disableBirdseye: true,
        showZoomButtons: false,
      })
      map.setOptions({ customMapStyle: style })
      window.Microsoft.Maps.Events.addHandler(map, 'mousedown', () => {
        userCenterChangeHangler = window.Microsoft.Maps.Events
          .addHandler(map, 'viewchange', () => {
            const centerArr: any[] = Object.entries(map.getCenter())
              .filter(e => e[0] === 'latitude' || e[0] === 'longitude')
              .map(e => e[1])
            appService.addCenterStatus(centerArr, id)
          })
      })
      window.Microsoft.Maps.Events.addHandler(map, 'mouseup', () => {
        window.Microsoft.Maps.Events.removeHandler(userCenterChangeHangler)
      })
      appService.addCenterEventListener(centerValue => {
        if (map) {
          map.setView({
            center: new window.Microsoft.Maps.Location(...centerValue),
          })
        }
      }, id)
      appService.addZoomEventListener(zoom => {
        if (map) {
          map.setView({ zoom })
        }
      }, id)
    }
  }, [])

  return (
    <div id="bing-map">&nbsp;</div>
  )
}

export default BingMap
