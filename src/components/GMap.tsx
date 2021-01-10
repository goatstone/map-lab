import React, { useEffect } from 'react'
import { Loader } from '@googlemaps/loader'
import config from '../config'
import { AppServiceInstanceI } from '../app-service'

declare global {
  interface Window { google: any; }
}

let map: any
let listener: any
const GMap = ({
  id,
  mainClassName,
  appService,
  timerEngine,
}: {
  appService: AppServiceInstanceI, id: number, mainClassName: any, timerEngine: any
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
        lat: 47.6,
        lng: -122.3,
      },
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: false,
      zoomControlOptions: {
        position: null,
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    }
    loader
      .load()
      .then(() => {
        // eslint-disable-next-line
        mapOptions.zoomControlOptions.position = window.google.maps.ControlPosition.TOP_RIGHT
        // eslint-disable-next-line
        map = new window.google.maps.Map(document.getElementById(idName), mapOptions)
        const userCenterChanged = () => {
          const centerArr = Object
            .entries(map.getCenter())
            .map((e: any) => e[1]())
          appService.addCenterStatus(centerArr, id)
          timerEngine.add(`${centerArr}`)
        }
        map.addListener('mousedown', () => {
          listener = map.addListener('center_changed', userCenterChanged)
        })
        map.addListener('mouseup', () => {
          // eslint-disable-next-line
          window.google.maps.event.removeListener(listener);
        })
      })
      .then(() => {
        appService.addCenterEventListener(centerValue => {
          if (map) {
            map.setCenter({ lat: centerValue[0], lng: centerValue[1] })
          }
        }, id)
        appService.addZoomEventListener(zoom => {
          if (map) {
            map.setZoom(zoom)
          }
        }, id)
        // timerEngine.onMessage(message => console.log('msg', message))
      })
      .catch(e => {
        throw new Error(`Library Not Loaded ${e}`)
      })
  }, [])

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

export default GMap
