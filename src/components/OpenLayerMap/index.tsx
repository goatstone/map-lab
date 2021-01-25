import React, { useState, useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'

interface IMapWrapper {
  (props: any): any
}
interface MapRef {
  current?: any
}

const MapWrapper: IMapWrapper = () => {
  const [map, setMap]: any[] = useState()
  const mapElement: any = useRef()
  const mapRef: MapRef = useRef()
  mapRef.current = map
  useEffect(() => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    })
    const xyz = new XYZ({
      url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
    })
    const initialMap = new Map({
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
    setMap(initialMap)
  }, [])

  return (
    <div className="openlayer">
      <div ref={mapElement} className="map-container" />
    </div>
  )
}

export default MapWrapper
