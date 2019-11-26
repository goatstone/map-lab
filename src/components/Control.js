import React from 'react'
import PropTypes from 'prop-types'

const Control = ({
  placeQueryInput,
  setPlaceQueryInput,
  setPlaceQuery,
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
  placeQueryInput: PropTypes.string.isRequired,
  setPlaceQueryInput: PropTypes.func.isRequired,
  setPlaceQuery: PropTypes.func.isRequired,
  isRunnningEngine: PropTypes.bool.isRequired,
  setEngine: PropTypes.func.isRequired,
}

export default Control
