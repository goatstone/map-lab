import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DrawerContainer.css'

const DrawerAlign = {
  LEFT: 'left',
  RIGHT: 'right',
}
export { DrawerAlign }

const DrawerContainer = ({ children, yPos = 20, alignX = DrawerAlign.LEFT }) => {
  // swap the alignments for the button
  const buttonPostion = alignX === DrawerAlign.LEFT ? DrawerAlign.RIGHT : DrawerAlign.LEFT

  // control hook: open closed state
  const [isOpen, setIsOpen] = useState(true)

  // component state
  const buttonSymbols = { OPEN: 'Open', CLOSED: 'Close' }
  const xPositions = { OPEN: 0, CLOSED: -250 }
  const drawerModes = { OPEN: 'OPEN', CLOSED: 'CLOSED' }
  const initState = {
    mode: drawerModes.OPEN,
    buttonSymbol: buttonSymbols.OPEN,
    xPosition: xPositions.OPEN,
  }
  const [state, setState] = useState(initState)

  // on isOpen change, state is updated
  useEffect(() => {
    const mode = isOpen ? drawerModes.OPEN : drawerModes.CLOSED
    const buttonSymbol = isOpen ? buttonSymbols.CLOSED : buttonSymbols.OPEN
    const xPosition = isOpen ? xPositions.OPEN : xPositions.CLOSED
    setState(stateCurr => Object.assign({}, stateCurr, {
      mode,
      buttonSymbol,
      xPosition,
    }))
  }, [isOpen])

  return (
    <section
      data-id="drawer-container"
      style={{
        top: yPos,
        [alignX]: state.xPosition,
      }}
    >
      {children}
      <button
        style={{ [buttonPostion]: -50 }}
        type="button"
        onClick={() => {
          setIsOpen(isOpenState => !isOpenState)
        }}
      >
        {state.buttonSymbol}
      </button>
    </section>
  )
}
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
DrawerContainer.propTypes = {
  children: PropTypes.node.isRequired,
  yPos: PropTypes.number.isRequired,
  alignX: PropTypes.string,
}

export default DrawerContainer
