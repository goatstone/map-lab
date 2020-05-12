import React, { useReducer, useEffect, useState } from 'react'
import {
  CommandBar,
  IconButton,
  initializeIcons,
  Modal,
  getTheme,
  mergeStyleSets,
} from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import GMap from './GMap'
import LMap from './Map'

const theme = getTheme()
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    fontSize: '1.4em',
    padding: '1em',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'center',
      padding: 0,
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
})
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
}
const cancelIcon = { iconName: 'Cancel' }

initializeIcons()

jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()

const items = [
  {
    key: 'd',
    text: 'Git',
    iconProps: { iconName: 'repo' },
    href: 'https://github.com/JoseHerminioCollas/map-lab',
  },
]

function App() {
  const initState = { center: [47.6, -122.3], callerId: null }
  const statusReducer = (state, action) => {
    switch (action.type) {
      case 'center': return Object.assign(
        {},
        state,
        { center: action.center, callerId: action.callerId },
      )
      default: return state
    }
  }
  const [status, statusDispatch] = useReducer(statusReducer, initState)
  const controlReducer = (state, action) => {
    switch (action.type) {
      case 'center': return Object.assign(
        {},
        state,
        { center: action.center, callerId: action.callerId },
      )
      default: return state
    }
  }
  const [control, controlDispatch] = useReducer(controlReducer, initState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const farItems = [
    {
      key: 'info',
      text: 'Info',
      // This needs an ariaLabel since it's icon-only
      ariaLabel: 'Info',
      iconOnly: true,
      iconProps: { iconName: 'Info' },
      onClick: () => setIsModalOpen(true),
    },
  ]
  // circular updates are prevented in the component
  useEffect(() => {
    controlDispatch({ type: 'center', center: status.center, callerId: status.callerId })
  }, [status])

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <Modal
          // titleAriaId={titleId}
          isOpen={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          isBlocking={false}
          containerClassName={contentStyles.container}
          dragOptions={false}
        >
          <div className={contentStyles.header}>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
          <h2>MapLab</h2>
          <p>
            MapLab is a place to establish examples of web mapping libraries.
            Currently, the libraries used are
            &nbsp;
            <a href="https://cloud.google.com/maps-platform" target="new">Google Maps Platform</a>
            &nbsp;
            and
            &nbsp;
            <a href="https://leafletjs.com/" target="new">Leaflet</a>
            &nbsp;
            in the context of a
            &nbsp;
            <a href="https://reactjs.org/" target="new">React</a>
            &nbsp;
            application.
          </p>
          <p>
            &copy;&nbsp;
            <a href="https://www.goatstone.com" target="new">Goatstone</a>
            &nbsp;
            2020
          </p>
        </Modal>
        <header>
          <h1>
            MapLab
          </h1>
          <CommandBar
            items={items}
            farItems={farItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
        </header>
        <div className={sheet.classes.frame}>
          <GMap
            mainClassName={sheet.classes.gMap}
            control={control}
            statusDispatch={statusDispatch}
          />
          <LMap
            mainClassName={sheet.classes.lMap}
            control={control}
            statusDispatch={statusDispatch}
            idName="leaflet"
          />
        </div>
      </section>
    </>
  )
}

export default App
