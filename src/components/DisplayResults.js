import React from 'react'
import PropTypes from 'prop-types'

const DisplayResults = ({ placeInfo, setPlaceFocusId, classNames }) => (
  <section className={classNames.displayResults}>
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
  classNames: PropTypes.object.isRequired,
}

export default DisplayResults
