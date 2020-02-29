import React, { useState } from 'react'
import PropTypes from 'prop-types'

const localStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
const Search = ({
  initSearchValue = '',
  radius,
  center,
  setPlaceQuery,
}) => {
  const [placeQueryInput, setPlaceQueryInput] = useState(initSearchValue)

  return (
    <section style={localStyle}>
      <input
        data-id="search-place"
        value={placeQueryInput}
        size={12}
        onChange={e => setPlaceQueryInput(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setPlaceQuery({
            query: placeQueryInput,
            radius,
            center,
          })
          setPlaceQueryInput('')
        }}
      >
        <i className="material-icons">search</i>
      </button>
    </section>
  )
}

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
Search.propTypes = {
  initSearchValue: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  center: PropTypes.array.isRequired,
  setPlaceQuery: PropTypes.func.isRequired,
}

export default Search
