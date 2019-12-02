import React from 'react'
import PropTypes from 'prop-types'

const Motion = ({
  isRunnningEngine,
  setEngine,
}) => (
  <section data-id="goatstone-component-motion">
    <fieldset>
      <legend>
        Motion
      </legend>
      <button
        type="button"
        data-id="start-stop"
        onClick={() => setEngine(!isRunnningEngine)}
      >
        <i className="material-icons">
          {!isRunnningEngine ? 'play_arrow' : 'stop'}
        </i>
      </button>
    </fieldset>
  </section>
)

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
Motion.propTypes = {
  isRunnningEngine: PropTypes.bool.isRequired,
  setEngine: PropTypes.func.isRequired,
}

export default Motion
