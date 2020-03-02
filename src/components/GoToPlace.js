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

const buttons = [
  ['Seattle', [47.6, -122.3]],
  ['New York', [40.7128, -74.0060]],
  ['Los Angeles', [34.0522, -118.2437]],
]
export { buttons }

const GoToPlace = ({
  setMoveCenterBy,
}) => (
  <section data-id="goto-place">
    {buttons.map(b => (
      <GoToPlaceButton
        latLn={[47.6, -122.3]}
        label="Seattle"
        setMoveCenterBy={setMoveCenterBy}
        key={b[0]}
      />
    ))}
  </section>
)

GoToPlace.propTypes = {
  setMoveCenterBy: PropTypes.func.isRequired,
}

export default GoToPlace
