import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './DrawerContainer.css'

const DrawerAlign = {
  LEFT: 'left',
  RIGHT: 'right',
}

export { DrawerAlign }

const DrawerContainer = ({ children, yPos = 20, alignX = DrawerAlign.LEFT }) => {
  const openX = 0
  const closeX = -250
  // isOpen isClosed TODO
  // swap the alignments for the button
  const buttonPostion = alignX === DrawerAlign.LEFT ? DrawerAlign.RIGHT : DrawerAlign.LEFT
  const [xPos, setXPos] = useState(closeX)
  const styleDefinition = { top: yPos, [alignX]: xPos }

  return (
    <section data-id="drawer-container" style={styleDefinition}>
      {children}
      <button
        style={{ [buttonPostion]: -50 }}
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
DrawerContainer.propTypes = {
  children: PropTypes.node.isRequired,
  yPos: PropTypes.number.isRequired,
  alignX: PropTypes.string.isRequired,
}

export default DrawerContainer
