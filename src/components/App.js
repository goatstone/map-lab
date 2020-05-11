import React, { useReducer, useEffect } from 'react'
import { CommandBar, initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import GMap from './GMap'
import LMap from './Map'

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
const farItems = [
  {
    key: 'info',
    text: 'Info',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
    href: 'https://www.goatstone.com',
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

  // circular updates are prevented in the component
  useEffect(() => {
    controlDispatch({ type: 'center', center: status.center, callerId: status.callerId })
  }, [status])

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <header>
          <h1>
            Map Lab
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
