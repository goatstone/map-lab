import React from 'react'
import PropTypes from 'prop-types'

const Frame = ({ children }) => (
  <section data-id="info-control-container">
    {children}
  </section>
)
Frame.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Frame
