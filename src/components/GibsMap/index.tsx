// react
import React, { useState, useEffect, useRef } from 'react'

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
// import { transform } from 'ol/proj'
// import { Coordinate } from 'ol/coordinate'

// ol.tilegrid.WMTS
interface IMapWrapper {
  (props: any): any
}
interface MapRef {
  current?: any
}

const GibsMap: IMapWrapper = (({ features }: { features: any[] }) => {
  // set intial state
  const [map, setMap]: any[] = useState()
  const [featuresLayer, setFeaturesLayer]: any[] = useState()
  // const [selectedCoord, setSelectedCoord]: any[] = useState()
  // pull refs
  const mapElement: any = useRef()
  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef: MapRef = useRef()
  mapRef.current = map
  // map click handler
  const handleMapClick = () => {
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    // const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
    // transform coord to EPSG 4326 standard Lat Long
    // const transormedCoord: Coordinate = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
    // set React state
    // setSelectedCoord(transormedCoord)
  }
  // initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {
    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    })
    const sourceB = new XYZ({
      url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/'
      + 'MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-06-15/'
      + 'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
      // matrixSet: 'EPSG4326_250m',
      // style: '',
      // layer: 'MODIS_Terra_CorrectedReflectance_TrueColor',
      // tileGrid: new TileGrid({
      //   origin: [-180, 90],
      //   resolutions: [
      //     0.5625,
      //     0.28125,
      //     0.140625,
      //     0.0703125,
      //     0.03515625,
      //     0.017578125,
      //     0.0087890625,
      //     0.00439453125,
      //     0.002197265625,
      //   ],
      //   matrixIds: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      //   tileSize: 512,
      // }),
    })
    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // USGS Topo
        new TileLayer({
          source: sourceB,
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
    <div ref={mapElement} className="openlayer" />
    // <div className="openlayer">
    //   <div ref={mapElement} className="map-container" />
    //   <div className="clicked-coord-label">
    //     <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
    //   </div>
    // </div>
  )
})

export default GibsMap
