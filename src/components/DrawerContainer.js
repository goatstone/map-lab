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
  width = 300,
  id = 'default',
}) => {
  const drawerContainerStyle = {
    position: 'absolute',
    zIndex: 900,
    transitionProperty: 'right, left',
    transitionDuration: '1s',
  }
  const setIsOpenbuttonStyle = {
    position: 'absolute',
    top: 0,
    padding: 0,
    zIndex: 1000,
  }

  const buttonSymbols = {
    OPEN: title,
    CLOSED: (
      <i className="material-icons">
        {
          alignX === DrawerAlign.LEFT ? 'chevron_left' : 'chevron_right'
        }
      </i>
    ),
  }
  const xPositions = {
    OPEN: 0,
    CLOSED: -(width),
  }

  const [isOpen, setIsOpen] = useState(initIsOpen)
  const [state, setState] = useState({
    buttonSymbol: buttonSymbols.OPEN,
    xPosition: xPositions.OPEN,
  })

  // update style sheet
  drawerContainerStyle.top = yPosition
  drawerContainerStyle.width = width
  if (alignX === DrawerAlign.LEFT) {
    drawerContainerStyle.left = state.xPosition
    setIsOpenbuttonStyle.left = 'calc(100% - 3px)'
  } else {
    drawerContainerStyle.right = state.xPosition
    setIsOpenbuttonStyle.right = 'calc(100% - 3px)'
  }

  // on isOpen change, state is updated
  useEffect(() => {
    setState(stateCurr => Object.assign({}, stateCurr, {
      buttonSymbol: isOpen ? buttonSymbols.CLOSED : buttonSymbols.OPEN,
      xPosition: isOpen ? xPositions.OPEN : xPositions.CLOSED,
    }))
  }, [isOpen])

  return (
    <section
      className={classNames.drawerContainer}
      data-component-name="drawer-container"
      data-id={id}
      style={drawerContainerStyle}
    >
      {children}
      <button
        style={setIsOpenbuttonStyle}
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
  classNames: PropTypes.object.isRequired,
  width: PropTypes.number,
  id: PropTypes.string,
}

export default DrawerContainer
