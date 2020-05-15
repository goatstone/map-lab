const initState = {
  center: [47.6, -122.3],
  callerId: null,
  zoomReset: true,
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
    default: return state
  }
}

export { initState, statusReducer, controlReducer }
