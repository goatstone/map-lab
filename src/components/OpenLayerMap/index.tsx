import React, { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'

interface IMapWrapper {
  (props: any): any
}

const MapWrapper: IMapWrapper = () => {
  const mapElement: any = useRef()
  useEffect(() => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    })
    const xyz = new XYZ({
      url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
    })
    // eslint-disable-next-line
    new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: xyz,
        }),
        initalFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 4,
      }),
      controls: [],
    })
  }, [])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default MapWrapper
