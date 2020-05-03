import React, { useReducer, useEffect } from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import StateDebug from './StateDebug'
import style from '../style/main-style'
import GMap from './GMap'
import LMap from './Map'

jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()

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
    <section className={sheet.classes.mainContainer}>
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
      <StateDebug
        isShow
        status={status}
      />
    </section>
  )
}

export default App
