const initZoom = 12
const initState = {
  center: [47.6, -122.3],
  callerId: null,
  zoom: initZoom,
}
const MIN_ZOOM = 0
const MAX_ZOOM = 18
const statusReducer = (state, action) => {
  switch (action.type) {
    case 'center': return Object.assign(
      {},
      state,
      { center: action.center, callerId: action.callerId, targetId: action.targetId },
    )
    case 'zoom': return Object.assign(
      {},
      state,
      { zoom: action.zoom, callerId: action.callerId, targetId: action.targetId },
    )
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
    case 'zoomIn': {
      const newNum = (state.zoom >= MAX_ZOOM) ? MAX_ZOOM : state.zoom + 1
      return Object.assign({}, state,
        { zoom: newNum, callerId: action.callerId })
    }
    case 'zoomOut': {
      const newNum = (state.zoom <= MIN_ZOOM) ? MIN_ZOOM : state.zoom - 1
      return Object.assign({}, state,
        { zoom: newNum, callerId: action.callerId })
    }
    default: return state
  }
}

export { initState, statusReducer, controlReducer }
