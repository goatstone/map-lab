import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import { AppServiceInstanceI } from '../app-service'

const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
  + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
  + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
const accessToken = 'pk.eyJ1IjoiZ29hdHN0b25lIiwiYSI6ImNrMmp5dnoycjFsazgzYm1zbjE0anRobzkifQ.tW-4mQDJK41ayRkBxtz15w'

function Map({
  id,
  appService,
  mainClassName,
  idName = 'leaflet-map',
}: { id: any, appService: AppServiceInstanceI, mainClassName: any, idName: string }) {
  const mapRef: any = useRef(null)
  const userMoveListener = () => {
    appService.addCenterStatus(
      [mapRef.current.getCenter().lat, mapRef.current.getCenter().lng], id,
    )
  }
  const grayscale = L.tileLayer(
    mbUrl,
    {
      id: 'mapbox/streets-v11',
      attribution,
      accessToken,
    },
  )
  const streets = L.tileLayer(
    mbUrl,
    {
      id: 'mapbox/streets-v11',
      attribution,
      accessToken,
    },
  )
  useEffect(() => {
    appService.addCenterEventListener(center => {
      if (mapRef.current) {
        mapRef.current.panTo(center)
      }
    }, id)
    mapRef.current = L.map(idName, {
      center: [47.6, -122.3],
      zoom: 12,
      layers: [
        grayscale, streets,
      ],
    })
    mapRef.current.on('mousedown', () => {
      mapRef.current.on('move', userMoveListener)
    })
    mapRef.current.on('mouseup', () => {
      mapRef.current.off('move')
    })
    mapRef.current.off('dblclick')
    mapRef.current.off('doubleClickZoom')
    mapRef.current.off('move')
  }, [])

  return (
    <div
      id={idName}
      className={mainClassName}
      style={{ width: '100%' }}
    />
  )
}

export default Map
