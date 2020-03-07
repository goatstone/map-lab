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
  const localStyleSheet = {
    setIsOpenbutton: {
      position: 'absolute',
      top: 0,
      padding: 0,
      zIndex: 1000,
    },
  }

  const [isOpen, setIsOpen] = useState(initIsOpen)

  // component state
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
  // isOpen? set initial state based on this TODO
  const initState = {
    buttonSymbol: buttonSymbols.OPEN,
    xPosition: xPositions.OPEN,
  }
  const [state, setState] = useState(initState)

  // update style sheet
  drawerContainerStyle.top = yPosition
  Object.assign(localStyleSheet,
    {
      drawerContainer:
        Object.assign(
          {},
          localStyleSheet.drawerContainer,
          { top: yPosition, width },
        ),
    })
  if (alignX === DrawerAlign.LEFT) {
    drawerContainerStyle.left = state.xPosition
    Object.assign(localStyleSheet,
      {
        setIsOpenbutton: Object.assign(
          {},
          localStyleSheet.setIsOpenbutton,
          { right: -10 },
        ),
      })
  } else {
    drawerContainerStyle.right = state.xPosition
    Object.assign(localStyleSheet,
      {
        setIsOpenbutton: Object.assign(
          {},
          localStyleSheet.setIsOpenbutton,
          { left: -10 },
        ),
      })
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
  classNames: PropTypes.object.isRequired,
  width: PropTypes.number,
  id: PropTypes.string,
}

export default DrawerContainer
