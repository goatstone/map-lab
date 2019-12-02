import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
  initIsOpen = false,
  classNames = null,
}) => {
  // swap the alignments for the button
  const buttonPostion = alignX === DrawerAlign.LEFT ? DrawerAlign.RIGHT : DrawerAlign.LEFT

  // control hook: open closed state
  const [isOpen, setIsOpen] = useState(initIsOpen)

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

  const localStyleSheet = {
    drawerContainer: {
      color: 'blue',
      top: yPosition,
      [alignX]: state.xPosition,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flexStart',
      width: 250,
      zIndex: 900,
      transitionProperty: 'right, left',
      transitionDuration: '1s',
      boxShadow: '10px 10px 10px rgba(100, 100, 100, 0.8)',
    },
    setIsOpenbutton: {
      position: 'absolute',
      top: 0,
      padding: 0,
      boxShadow: '10px 10px 10px rgba(100, 100, 100, 0.8)',
      zIndex: 1000,
      [buttonPostion]: -50,
      background: 'red',
    },
  }
  // if classNames are not provided add default styles to localStyleSheet
  if (classNames === null) {
    Object.assign(localStyleSheet.drawerContainer, { background: 'red' })
  }

  return (
    <section
      className={classNames && classNames.drawerContainer}
      data-component-id="goatstone-container-drawer"
      style={localStyleSheet.drawerContainer}
    >
      {children}
      <button
        style={localStyleSheet.setIsOpenbutton}
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
  yPosition: PropTypes.number.isRequired,
  alignX: PropTypes.string,
  title: PropTypes.string,
  initIsOpen: PropTypes.bool,
  classNames: PropTypes.object,
}

export default DrawerContainer
