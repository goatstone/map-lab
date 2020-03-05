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

const GoToPlace = ({
  buttonConfig, setMoveCenterBy,
}) => (
  <section data-id="goto-place">
    {buttonConfig.map(b => (
      <GoToPlaceButton
        latLn={b[1]}
        label={b[0]}
        setMoveCenterBy={setMoveCenterBy}
        key={b[0]}
      />
    ))}
  </section>
)

GoToPlace.propTypes = {
  setMoveCenterBy: PropTypes.func.isRequired,
  buttonConfig: PropTypes.array.isRequired,
}

export default GoToPlace
