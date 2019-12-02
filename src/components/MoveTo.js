import React from 'react'
import PropTypes from 'prop-types'

const MoveTo = ({
  setCenterPanMapTo,
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
        &#x279A;
      </button>
    </fieldset>
    <fieldset>
      <legend>
        Map
      </legend>
      <button
        type="button"
        onClick={() => setCenterPanMapTo(([lat, lng]) => [lat + 0.01, lng + 0.01])}
      >
        &#x279A;
      </button>
    </fieldset>

  </section>
)

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
MoveTo.propTypes = {
  setCenterPanMapTo: PropTypes.func, // TODO take out eslint disable for this prop
  moveMarker: PropTypes.func.isRequired,
}

export default MoveTo
