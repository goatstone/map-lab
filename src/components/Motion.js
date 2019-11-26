import React from 'react'
import PropTypes from 'prop-types'

const Motion = ({
  isRunnningEngine,
  setEngine,
}) => (
  <section data-id="motion">
    <fieldset>
      <legend>
        Motion
      </legend>
      <button
        type="button"
        data-id="start-stop"
        onClick={() => setEngine(!isRunnningEngine)}
      >
        {!isRunnningEngine ? <span>&#x2771;</span> : <span>&#x2751;</span>}
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
