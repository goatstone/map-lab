import React from 'react'
import PropTypes from 'prop-types'

function StateDebug({ mapStatus, isShow = false }) {
  let debugId = ''
  // eslint-disable-next-line
  if (window.location.search) {
    // eslint-disable-next-line
    const queryStr = window.location.search
    const debugQuery = queryStr.match(/debug=([\d|\w]{1,})/)
    if (debugQuery !== null) {
      // eslint-disable-next-line
      debugId = debugQuery[1]
    }
  }
  const stateDebugStyle = {
    display: isShow ? 'block' : 'none',
    position: 'fixed',
    background: 'rgba(100, 100, 100, 0.7)',
    fontSize: '0.75em',
    bottom: 0,
    left: 0,
    zIndex: 9000,
  }
  return (
    <div
      style={stateDebugStyle}
      className="debug"
    >
      {Object
        .entries(mapStatus)
        .map(el => (
          <div>
            {el[0]}
            :
            {el[1]}
          </div>
        ))}
      id:
      {debugId}
    </div>
  )
}
/* eslint-disable react/forbid-prop-types */
StateDebug.propTypes = {
  mapStatus: PropTypes.object.isRequired,
  isShow: PropTypes.bool.isRequired,
}

export default StateDebug
