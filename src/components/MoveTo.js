import React from 'react'
import PropTypes from 'prop-types'

const MoveTo = ({
  setMapControl,
  // setCenterPanMapTo,
  moveMarker,
}) => (
  <section data-id="goatstone-component-moveto">
    <fieldset>
      <legend>
        Marker
      </legend>
      <button
        type="button"
        onClick={() => {
          const moveOffset = [0.001, 0.001]
          moveMarker(postion => [
            postion[0] + moveOffset[0],
            postion[1] + moveOffset[1],
          ])
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
  // setCenterPanMapTo: PropTypes.func, // TODO take out eslint disable for this prop
  moveMarker: PropTypes.func.isRequired,
}

export default MoveTo
