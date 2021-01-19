import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiZ29hdHN0b25lIiwiYSI6ImNrMmp5dnoycjFsazgzYm1zbjE0anRobzkifQ.tW-4mQDJK41ayRkBxtz15w'

function MapBox({ idName = 'mapbox' }: { idName: string }) {
  const ref: React.MutableRefObject<any> = useRef(null)
  let map: any
  useEffect(() => {
    map = new mapboxgl.Map({
      container: ref.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [20.00, 20.00],
      zoom: 1.5,
    })
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.addLayer(
      {
        id: 'countries',
        type: 'fill',
        source: 'countries',
      },
      'country-label',
    )
    console.log('map', map, ref.current)
    console.log(idName)
    return () => map.remove()
  }, [])

  return (
    <div
      ref={ref}
      id={idName}
    >
      aaaaxxx
    </div>
  )
}

export default MapBox
