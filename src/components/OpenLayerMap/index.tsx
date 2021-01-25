// react
import React, { useState, useEffect, useRef } from 'react'

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import { Coordinate, toStringXY } from 'ol/coordinate'

// ol.tilegrid.WMTS
interface IMapWrapper {
  (props: any): any
}
interface MapRef {
  current?: any
}

const MapWrapper: IMapWrapper = (({ features }: { features: any[] }) => {
  // set intial state
  const [map, setMap]: any[] = useState()
  const [featuresLayer, setFeaturesLayer]: any[] = useState()
  const [selectedCoord, setSelectedCoord]: any[] = useState()
  // pull refs
  const mapElement: any = useRef()
  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef: MapRef = useRef()
  mapRef.current = map
  // map click handler
  const handleMapClick = (event: any) => {
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord: Coordinate = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
    // set React state
    setSelectedCoord(transormedCoord)
  }
  // initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {
    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    })
    const xyz = new XYZ({
      url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
    })
    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // USGS Topo
        new TileLayer({
          source: xyz,
        }),
        // Google Maps Terrain
        /* new TileLayer({
          source: new XYZ({
            url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
          })
        }), */
        initalFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
      controls: [],
    })
    // set map onclick handler
    initialMap.on('click', handleMapClick)
    // save map and vector layer references to state
    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)
  }, [])
  // update map if features prop changes - logic formerly put into componentDidUpdate
  useEffect(() => {
    if (features.length) { // may be null on first render
      // set features to map
      featuresLayer.setSource(
        new VectorSource({
          features, // make sure features is an array
        }),
      )
      // fit map to feature extent (with 100px of padding)
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100, 100, 100, 100],
      })
    }
  }, [features])

  // render component
  return (
    <div className="openlayer">
      <div ref={mapElement} className="map-container" />
      <div className="clicked-coord-label">
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>
    </div>
  )
})

export default MapWrapper
