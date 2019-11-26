import React from 'react'
import PropTypes from 'prop-types'

const Control = ({
  placeQueryInput,
  setPlaceQueryInput,
  setPlaceQuery,
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
  </section>
)

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
Control.propTypes = {
  placeQueryInput: PropTypes.string.isRequired,
  setPlaceQueryInput: PropTypes.func.isRequired,
  setPlaceQuery: PropTypes.func.isRequired,
}

export default Control
