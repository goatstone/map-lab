import React from 'react'
import PropTypes from 'prop-types'
import GoToPlaceButton from './GoToPlaceButton'

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
