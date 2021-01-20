import React, {
  useEffect,
  useRef,
} from 'react'
import mapboxgl from 'mapbox-gl'
import './style.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiZ29hdHN0b25lIiwiYSI6ImNrMmp5dnoycjFsazgzYm1zbjE0anRobzkifQ.tW-4mQDJK41ayRkBxtz15w'
// mapboxgl.accessToken =
// 'pk.eyJ1IjoiZ29hdHN0b25lIiwiYSI6ImNrMmp5dnoycjFsazgzYm1zbjE0anRobzkifQ.tW-4mQDJK41ayRkBxtz15w'

const MapBox = () => {
  const mapContainerRef = useRef(null)
  // initialize map when component mounts
  useEffect(() => {
    console.log('eff', mapContainerRef)
    let map
    if (mapContainerRef.current) {
      map = new mapboxgl.Map({
        container: mapContainerRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-104.9876, 39.7405],
        zoom: 12.5,
      })
    }
    return () => map.remove()
  })
  // add navigation control (the +/- zoom buttons)
  // map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

  // clean up on unmount
  // }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />
}

export default MapBox
