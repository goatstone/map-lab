const initState = {
  center: [47.6, -122.3],
  callerId: null,
  zoom: 8,
}
const statusReducer = (state, action) => {
  switch (action.type) {
    case 'center': return Object.assign(
      {},
      state,
      { center: action.center, callerId: action.callerId },
    )
    case 'zoom': return Object.assign(
      {},
      state,
      { zoom: action.zoom, callerId: action.callerId },
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
    case 'zoom': return Object.assign(
      {},
      state,
      { zoom: action.zoom, callerId: action.callerId },
    )
    default: return state
  }
}

export { initState, statusReducer, controlReducer }
