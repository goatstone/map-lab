import React from 'react'
import PropTypes from 'prop-types'

function GoToPlaceButton({ latLn, label, setMoveCenterBy }) {
  return (
    <button
      type="button"
      onClick={() => {
        setMoveCenterBy(latLn)
      }}
    >
      {label}
    </button>
  )
}
/* eslint-disable react/forbid-prop-types */
GoToPlaceButton.propTypes = {
  latLn: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  setMoveCenterBy: PropTypes.func.isRequired,
}

export default GoToPlaceButton
