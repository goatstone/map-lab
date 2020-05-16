import React, { useReducer, useEffect, useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import {
  GMap,
  LMap,
  InfoModal,
} from '.'
import MainHeader from './MainHeader'
import {
  repoCommandItem,
  gotoCommandItems,
  infoCommandItem,
  zoomCommandItem,
  infoWithAction,
  goToWithAction,
  withAction,
} from '../command-items'
import { statusReducer, controlReducer, initState } from '../status-control'
import { cities } from '../data'

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, statusDispatch] = useReducer(statusReducer, initState)
  const [control, controlDispatch] = useReducer(controlReducer, initState)

  infoWithAction(infoCommandItem, setIsModalOpen)
  goToWithAction(gotoCommandItems, cities, statusDispatch)
  withAction(zoomCommandItem, () => {
    statusDispatch({
      type: 'zoomReset',
      zoomReset: true,
      callerId: 1000,
    })
  })
  const zoomOut = {
    key: 'zoomOut',
    text: 'Zoom Out',
    iconProps: { iconName: 'zoomout' },
  }
  withAction(zoomOut, () => {
    statusDispatch({
      type: 'zoomOut',
      callerId: 2000,
    })
  })
  const zoomIn = { key: 'zoom-in', text: 'Zoom In', iconProps: { iconName: 'zoomin' } }
  withAction(zoomIn, () => {
    statusDispatch({
      type: 'zoomIn',
      callerId: 3000,
    })
  })

  // circular updates are prevented in the component
  useEffect(() => {
    controlDispatch({ type: 'center', center: status.center, callerId: status.callerId })
  }, [status.center])
  useEffect(() => {
    controlDispatch({ type: 'zoomReset', zoomReset: status.zoomReset, callerId: status.callerId })
  }, [status.zoomReset])
  useEffect(() => {
    controlDispatch({
      type: 'zoomLeaflet',
      zoom: status.zoom.leaflet,
      callerId: status.callerId,
    })
  }, [status.zoom.leaflet])

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <InfoModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
        <MainHeader
          title="MapLab"
          items={[repoCommandItem, gotoCommandItems, zoomCommandItem, zoomOut, zoomIn]}
          farItems={[infoCommandItem]}
        />
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
