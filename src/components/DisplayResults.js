import React, { useState } from 'react'
import PropTypes from 'prop-types'

const DisplayResults = ({ placeInfo }) => {
  const [xPos, setXPos] = useState(0)
  const openX = 0
  const closeX = -225
  return (
    <section data-id="display-results" style={{ left: xPos }}>
      <ul>
        {placeInfo.results.map(el => (
          <li title={`${el.name} : ${el.formatted_address}`}>
            {`${el.name}`}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          const newX = xPos === openX ? closeX : openX
          setXPos(newX)
        }}
      >
        {xPos === openX ? 'Close' : 'Open'}
      </button>
    </section>
  )
}
/* eslint-disable react/forbid-prop-types */
DisplayResults.propTypes = {
  placeInfo: PropTypes.object.isRequired,
}

export default DisplayResults
