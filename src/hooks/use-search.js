import { useState, useEffect } from 'react'
import axios from 'axios'

function useSearch(initQuery = {
  query: '',
  radius: 50000,
  center: [0, 0],
  server: null,
}) {
  const [searchQuery, setSearchQuery] = useState(initQuery)
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    console.log('search qs', searchQuery)
    if (searchQuery.query === '') return () => 1
    const placeInfoPacket = {
      q: searchQuery,
      message: '',
      results: [],
    };
    (async () => {
      // get these values from the map so the results are framed in the map
      const servers = {
        local: 'http://localhost:8080',
        remote: 'https://map-server-goatstone.appspot.com',
      }
      const url = `${servers.remote}/places?query=${'truck'}&location=${[43.333, 30.00]}&radius=${400}`
      console.log(url)
      const pI = await axios(url)
      // TODO check for 400 error
      if (Array.isArray(pI.data)) {
        placeInfoPacket.message = pI.data[0].name
        placeInfoPacket.results = pI.data
      } else {
        placeInfoPacket.message = 'No Results'
        placeInfoPacket.results = []
      }
      setSearchResults(placeInfoPacket)
    })()
    return () => 1
  }, [searchQuery])

  return [setSearchQuery, searchResults]
}

export default useSearch
