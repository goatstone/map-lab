import React from 'react'
import PropTypes from 'prop-types'

const DisplayResults = ({ placeInfo, setPlaceFocusId }) => (
  <section data-id="display-results">
    <ul>
      {placeInfo.results.map((el, i) => (
        // eslint-disable-next-line
        <li
          title={`${el.name} : ${el.formatted_address}`}
          onClick={() => setPlaceFocusId(i)}
          key={`${el.name}`}
        >
          {`${el.name}`}
        </li>
      ))}
    </ul>
  </section>
)
/* eslint-disable react/forbid-prop-types */
DisplayResults.propTypes = {
  placeInfo: PropTypes.object.isRequired,
  setPlaceFocusId: PropTypes.func.isRequired,
}

export default DisplayResults
