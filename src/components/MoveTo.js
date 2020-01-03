import React from 'react'
import PropTypes from 'prop-types'

const MoveTo = ({
  setMapControl,
}) => (
  <section data-id="goatstone-component-moveto">
    <fieldset>
      <legend>
        Marker
      </legend>
      <button
        type="button"
        onClick={() => {
          setMapControl(config => {
            const inc = 0.01
            const moveMarkerTo = [
              config.moveMarkerTo[0] + inc,
              config.moveMarkerTo[1] + inc,
            ]
            const rv = Object.assign(
              {},
              config,
              { moveMarkerTo },
            )
            return rv
          })
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
          setMapControl(config => {
            // move by increment
            const inc = 0.01
            const moveCenterTo = [
              config.moveCenterTo[0] + inc,
              config.moveCenterTo[1] + inc,
            ]
            const rv = Object.assign(
              {},
              config,
              { moveCenterTo },
            )
            return rv
          })
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
  setMapControl: PropTypes.func,
}

export default MoveTo
