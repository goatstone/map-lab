const initZoom = 12
const initState = {
  center: [47.6, -122.3],
  callerId: null,
  zoom: {
    leaflet: initZoom,
    gmap: initZoom,
    bingmap: initZoom,
  },
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
      {
        zoom: {
          leaflet: initZoom,
          gmap: initZoom,
          bingmap: initZoom,
        },
      },
    )
    case 'zoomOutLeaflet': {
      const MIN_ZOOM = 0
      const newNum = (state.zoom.leaflet <= MIN_ZOOM) ? MIN_ZOOM : state.zoom.leaflet - 1
      const zoom = Object.assign({}, state.zoom, { leaflet: newNum })
      return Object.assign({}, state,
        { zoom },
        { callerId: action.callerId })
    }
    case 'zoomInLeaflet': {
      const MAX_ZOOM = 18
      const newNum = (state.zoom.leaflet >= MAX_ZOOM) ? MAX_ZOOM : state.zoom.leaflet + 1
      const zoom = Object.assign({}, state.zoom, { leaflet: newNum })
      return Object.assign({}, state,
        { zoom },
        { callerId: action.callerId })
    }
    case 'zoomOutGMap': {
      const MIN_ZOOM = 0
      const newNum = (state.zoom.gmap <= MIN_ZOOM) ? MIN_ZOOM : state.zoom.gmap - 1
      const zoom = Object.assign({}, state.zoom, { gmap: newNum })
      return Object.assign({}, state,
        { zoom },
        { callerId: action.callerId })
    }
    case 'zoomInGMap': {
      const MAX_ZOOM = 18
      const newNum = (state.zoom.gmap >= MAX_ZOOM) ? MAX_ZOOM : state.zoom.gmap + 1
      const zoom = Object.assign({}, state.zoom, { gmap: newNum })
      return Object.assign({}, state,
        { zoom },
        { callerId: action.callerId })
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
    case 'zoom': return Object.assign({}, state,
      { zoom: action.zoom, callerId: action.callerId })
    default: return state
  }
}

export { initState, statusReducer, controlReducer }
