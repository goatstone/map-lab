import { useState } from 'react'

function useMapStatus(initConfig = {
  center: [0, 0],
  zoomLevel: 12,
}) {
  const [mapStatus, setMapStatus] = useState(initConfig)
  const mapStatusActions = {
    center: centerStatus => (
      setMapStatus(status => Object.assign({}, status, {
        center: centerStatus,
      }))
    ),
    zoomLevel: zoomLevelStatus => (
      setMapStatus(status => Object.assign({}, status, {
        zoomLevel: zoomLevelStatus,
      }))
    ),
  }
  return [mapStatus, mapStatusActions]
}

export default useMapStatus
