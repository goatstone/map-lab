import React from 'react'
import PropTypes from 'prop-types'

const GoToPlace = ({
  setMoveCenterBy,
}) => (
  <section data-id="goto-place">
    <button
      type="button"
      onClick={() => {
        setMoveCenterBy([47.6, -122.3])
      }}
    >
      Seattle
    </button>
    <button
      type="button"
      onClick={() => {
        setMoveCenterBy([40.7128, -74.0060])
      }}
    >
      New York
    </button>
    <button
      type="button"
      onClick={() => setMoveCenterBy([34.0522, -118.2437])}
    >
      LA
    </button>
  </section>
)

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
GoToPlace.propTypes = {
  setMoveCenterBy: PropTypes.func,
}

export default GoToPlace
