import React from 'react'
import PropTypes from 'prop-types'

const Control = ({
  setCenterPanMapTo,
  placeQueryInput,
  setPlaceQueryInput,
  setPlaceQuery,
  moveMarker,
  isRunnningEngine,
  setEngine,
}) => (
  <section data-id="control">
    <fieldset>
      <legend>
        Place Search
      </legend>
      <input
        data-id="search-place"
        value={placeQueryInput}
        onChange={e => setPlaceQueryInput(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setPlaceQuery(placeQueryInput)
          setPlaceQueryInput('')
        }}
      >
        Search
      </button>
    </fieldset>
    <fieldset>
      <legend>
        Move Marker
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
        Move Map
      </legend>
      <button
        type="button"
        onClick={() => setCenterPanMapTo(([lat, lng]) => [lat + 0.01, lng + 0.01])}
      >
        &#x279A;
      </button>
    </fieldset>

    <fieldset>
      <legend>
        Motion
      </legend>
      <button
        type="button"
        data-id="start-stop"
        onClick={() => setEngine(!isRunnningEngine)}
      >
        {!isRunnningEngine ? <span>&#x2771;</span> : <span>&#x2751;</span>}
      </button>
    </fieldset>

  </section>
)

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
Control.propTypes = {
  setCenterPanMapTo: PropTypes.func, // TODO take out eslint disable for this prop
  placeQueryInput: PropTypes.string.isRequired,
  setPlaceQueryInput: PropTypes.func.isRequired,
  setPlaceQuery: PropTypes.func.isRequired,
  moveMarker: PropTypes.func.isRequired,
  isRunnningEngine: PropTypes.bool.isRequired,
  setEngine: PropTypes.func.isRequired,
}

export default Control
