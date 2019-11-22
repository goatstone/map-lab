import React from 'react'
import PropTypes from 'prop-types'

const Control = ({
  placeQueryInput,
  setPlaceQueryInput,
  setPlaceQuery,
  moveCenterBy,
  moveCenterTo,
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
        onClick={() => setPlaceQuery(placeQueryInput)}
      >
        Search
      </button>
    </fieldset>
    <fieldset>
      <legend>
        Go To
      </legend>
      <button
        type="button"
        onClick={() => moveCenterTo([47.6, -122.3])}
      >
        Seattle
      </button>
    </fieldset>
    <fieldset>
      <legend>
        Move Marker
      </legend>

      <button
        type="button"
        onClick={() => {
          moveMarker([0.001, 0.001])
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
        onClick={() => moveCenterBy([0.01, 0.01])}
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
Control.propTypes = {
  placeQueryInput: PropTypes.string.isRequired,
  setPlaceQueryInput: PropTypes.string.isRequired,
  setPlaceQuery: PropTypes.string.isRequired,
  moveCenterBy: PropTypes.array.isRequired,
  moveCenterTo: PropTypes.array.isRequired,
  moveMarker: PropTypes.array.isRequired,
  isRunnningEngine: PropTypes.bool.isRequired,
  setEngine: PropTypes.func.isRequired,
}

export default Control
