import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DrawerContainer.css'

const DrawerAlign = {
  LEFT: 'left',
  RIGHT: 'right',
}
export { DrawerAlign }

const DrawerContainer = ({
  children,
  yPosition = 20,
  alignX = DrawerAlign.LEFT,
  title = 'Open',
}) => {
  // swap the alignments for the button
  const buttonPostion = alignX === DrawerAlign.LEFT ? DrawerAlign.RIGHT : DrawerAlign.LEFT

  // control hook: open closed state
  const [isOpen, setIsOpen] = useState(true)

  // component state
  const buttonSymbols = { OPEN: title, CLOSED: 'Close' }
  const xPositions = { OPEN: 0, CLOSED: -250 }
  const initState = {
    buttonSymbol: buttonSymbols.OPEN,
    xPosition: xPositions.OPEN,
  }
  const [state, setState] = useState(initState)

  // on isOpen change, state is updated
  useEffect(() => {
    const buttonSymbol = isOpen ? buttonSymbols.CLOSED : buttonSymbols.OPEN
    const xPosition = isOpen ? xPositions.OPEN : xPositions.CLOSED
    setState(stateCurr => Object.assign({}, stateCurr, {
      buttonSymbol,
      xPosition,
    }))
  }, [isOpen])

  return (
    <section
      data-id="drawer-container"
      style={{
        top: yPosition,
        [alignX]: state.xPosition,
      }}
    >
      {children}
      <button
        style={{ [buttonPostion]: -50 }}
        type="button"
        data-id="set-is-open"
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
  yPosition: PropTypes.number.isRequired,
  alignX: PropTypes.string,
  title: PropTypes.string,
}

export default DrawerContainer
