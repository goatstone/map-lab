import React from 'react'
import PropTypes from 'prop-types'

const MoveTo = ({
  setMoveCenterBy,
  setMoveMarkerBy,
}) => (
  <section data-id="goatstone-component-moveto">
    <fieldset>
      <legend>
        Marker
      </legend>
      <button
        type="button"
        onClick={() => {
          setMoveMarkerBy([0.01, 0.01])
        }}
      >
        <i className="material-icons" style={{ transform: 'rotate(45deg)' }}>arrow_upward</i>
      </button>
    </fieldset>
    <fieldset>
      <legend>
        Map
      </legend>
      <button
        type="button"
        onClick={() => {
          setMoveCenterBy([0.01, 0.01])
        }}
      >
        <i className="material-icons" style={{ transform: 'rotate(45deg)' }}>arrow_upward</i>
      </button>
    </fieldset>
  </section>
)

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
MoveTo.propTypes = {
  setMoveCenterBy: PropTypes.func,
  setMoveMarkerBy: PropTypes.func,
}

export default MoveTo
