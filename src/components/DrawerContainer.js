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
  classNames = null, // main className value styleDefs
  width = 250,
  id = 'default',
}) => {
  // swap the alignments for the button
  const buttonPostion = alignX === DrawerAlign.LEFT ? DrawerAlign.RIGHT : DrawerAlign.LEFT
  const buttonIcon = alignX === DrawerAlign.LEFT ? 'chevron_left' : 'chevron_right'
  // control hook: open closed state
  const [isOpen, setIsOpen] = useState(initIsOpen)

  // component state
  const buttonSymbols = { OPEN: title, CLOSED: <i className="material-icons">{buttonIcon}</i> }
  const xPositions = { OPEN: 0, CLOSED: -(width) }
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
      top: yPosition,
      [alignX]: state.xPosition,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width,
      padding: '0.5em',
      borderRadius: '0.3em',
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
      [buttonPostion]: -40,
    },
  }
  // if classNames are not provided add default styles to localStyleSheet
  if (classNames === null) {
    Object.assign(localStyleSheet.drawerContainer, { background: 'rgba(100, 100, 100, 0.9)' })
  }
  return (
    <section
      className={classNames && classNames.drawerContainer}
      data-component-name="drawer-container" // lower-case dash version of component name
      data-id={id}
      style={localStyleSheet.drawerContainer}
    >
      {children}
      <button
        style={localStyleSheet.setIsOpenbutton}
        type="button"
        onClick={() => {
          setIsOpen(isOpenState => !isOpenState)
        }}
        data-component-name="toggle"
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
  width: PropTypes.number,
  id: PropTypes.string,
}

export default DrawerContainer
