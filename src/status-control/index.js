const initState = {
  center: [47.6, -122.3],
  callerId: null,
  zoomReset: true,
  zoom: { leaflet: 9 },
}
const statusReducer = (state, action) => {
  switch (action.type) {
    case 'center': return Object.assign(
      {},
      state,
      { center: action.center, callerId: action.callerId },
    )
    case 'zoomReset': return Object.assign(
      {},
      state,
      { zoomReset: action.zoomReset, callerId: action.callerId },
    )
    case 'zoomOut': {
      const MIN_ZOOM = 0
      const newNum = (state.zoom.leaflet <= MIN_ZOOM) ? MIN_ZOOM : state.zoom.leaflet - 1
      return Object.assign({}, state,
        { zoom: { leaflet: newNum }, callerId: action.callerId })
    }
    case 'zoomIn': {
      const MAX_ZOOM = 18
      const newNum = (state.zoom.leaflet >= MAX_ZOOM) ? MAX_ZOOM : state.zoom.leaflet + 1
      return Object.assign({}, state,
        { zoom: { leaflet: newNum }, callerId: action.callerId })
    }
    default: return state
  }
}
const controlReducer = (state, action) => {
  switch (action.type) {
    case 'center': return Object.assign(
      {},
      state,
      { center: action.center, callerId: action.callerId },
    )
    case 'zoomReset': return Object.assign(
      {},
      state,
      { zoomReset: action.zoomReset, callerId: action.callerId },
    )
    case 'zoom': return Object.assign({}, state,
      { zoom: action.zoom, callerId: action.callerId })
    default: return state
  }
}

export { initState, statusReducer, controlReducer }
