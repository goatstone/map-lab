import React from 'react'
import PropTypes from 'prop-types'

const GMap = ({ center, mainClassName }) => (
  <div
    className={mainClassName}
    data-component-name="gmap"
  >
    GMap
    {center}
  </div>
)
/* eslint-disable react/forbid-prop-types */
GMap.propTypes = {
  center: PropTypes.array.isRequired,
  mainClassName: PropTypes.string.isRequired,
}

export default GMap
