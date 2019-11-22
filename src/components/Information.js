import React from 'react'
import PropTypes from 'prop-types'

const Information = ({ placeInfo, mapCenter }) => (
  <section data-id="information">
    {placeInfo && (
      <article>
        Search Query:
        {
          ` ${placeInfo.q} : ${placeInfo.message} `
        }
      </article>
    )}

    <article>
      Map&nbsp;Center:&nbsp;
      latitude:
      &nbsp;
      {mapCenter[0].toFixed(4)}
      &nbsp;longitude:
      &nbsp;
      {mapCenter[1].toFixed(4)}
    </article>
  </section>
)
/* eslint-disable react/forbid-prop-types */
Information.propTypes = {
  placeInfo: PropTypes.object.isRequired,
  mapCenter: PropTypes.array.isRequired,
}
export default Information
