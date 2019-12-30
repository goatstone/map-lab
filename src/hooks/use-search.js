import { useState, useEffect } from 'react'
import axios from 'axios'

function useSearch(mapCenter, searchQRadius) {
  const [placeQuery, setPlaceQuery] = useState('')
  const [placeInfo, setPlaceInfo] = useState(null)
  useEffect(() => {
    if (placeQuery === '') return () => 1
    const placeInfoPacket = {
      q: placeQuery,
      message: '',
      results: [],
    };
    (async () => {
      // get these values from the map so the results are framed in the map
      const servers = {
        local: 'http://localhost:8080',
        remote: 'https://map-server-goatstone.appspot.com',
      }
      const url = `${servers.remote}/places?query=${placeQuery}&location=${mapCenter}&radius=${searchQRadius}`
      const pI = await axios(url)
      // TODO check for 400 error
      if (Array.isArray(pI.data)) {
        placeInfoPacket.message = pI.data[0].name
        placeInfoPacket.results = pI.data
      } else {
        placeInfoPacket.message = 'No Results'
        placeInfoPacket.results = []
      }
      setPlaceInfo(placeInfoPacket)
    })()
    return () => 1
  }, [placeQuery])

  return [setPlaceQuery, placeInfo]
}

export default useSearch
