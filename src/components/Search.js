import React from 'react'
import PropTypes from 'prop-types'

const Search = ({
  placeQueryInput,
  setPlaceQueryInput,
  setPlaceQuery,
}) => (
  <section data-id="search">
    <input
      data-id="search-place"
      value={placeQueryInput}
      size={12}
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
  </section>
)

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
Search.propTypes = {
  placeQueryInput: PropTypes.string.isRequired,
  setPlaceQueryInput: PropTypes.func.isRequired,
  setPlaceQuery: PropTypes.func.isRequired,
}

export default Search
