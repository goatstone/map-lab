import React, { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import * as olProj from 'ol/proj'
import { AppServiceInstanceI } from '../../app-service'

interface IMapWrapper {
  (id: number, appService: AppServiceInstanceI, url: any): any
}

const MapWrapper = ({ id, appService, url }: {
  id: number,
  appService: AppServiceInstanceI,
  url: string,
}) => {
  const mapElement: any = useRef()
  const addCenter = (center: any) => {
    appService.addCenterStatus(center, id)
  }
  useEffect(() => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    })
    const xyz = new XYZ({
      url,
      attributions: ['© OpenStreetMap -Mitwirkende, SRTM | Affichage de la carte: © OpenTopoMap (CC-BY-SA)'],
    })
    const map: any = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: xyz,
        }),
        initalFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [-13614350.227919813, 6040458.372108159],
        zoom: 12,
      }),
    }).on('pointerdrag', (e: any) => {
      const latLong = olProj.toLonLat(e.map.getView().getCenter())
      addCenter([latLong[1], latLong[0]])
    })
    appService.addCenterEventListener(center => {
      if (map) {
        const lLConverted = olProj.fromLonLat([center[1], center[0]])
        map.target.getView().setCenter(lLConverted)
      }
    }, id)
  }, [])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default MapWrapper
