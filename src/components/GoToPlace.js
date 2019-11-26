import React from 'react'
import PropTypes from 'prop-types'

const GoToPlace = ({
  setCenterPanMapTo,
}) => (
  <section data-id="goto-place">
    <button
      type="button"
      onClick={() => setCenterPanMapTo([47.6, -122.3])}
    >
      Seattle
    </button>
    <button
      type="button"
      onClick={() => setCenterPanMapTo([40.7128, -74.0060])}
    >
      New York
    </button>
    <button
      type="button"
      onClick={() => setCenterPanMapTo([34.0522, -118.2437])}
    >
      LA
    </button>
  </section>
)

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
GoToPlace.propTypes = {
  setCenterPanMapTo: PropTypes.func,
}

export default GoToPlace
