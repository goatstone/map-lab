import React, { useReducer, useEffect, useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import {
  GMap,
  LMap,
  InfoModal,
  BingMap,
} from '.'
import MainHeader from './MainHeader'
import {
  repoCommandItem,
  gotoCommandItems,
  infoCommandItem,
  zoomCommandItem,
  zoomInLeaflet,
  zoomOutLeaflet,
  zoomInGMap,
  zoomOutGMap,
  zoomBingMap,
  infoWithAction,
  goToWithAction,
  withAction,
} from '../command-items'
import { statusReducer, controlReducer, initState } from '../status-control'
import { cities } from '../data'
import config from '../config'

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, statusDispatch] = useReducer(statusReducer, initState)

  const controlIds = { BING: 'BING', GMAP: 'GMAP', LEAFLET: 'LEAFLET' }
  const controls = {}
  const controlsDispatch = {}
  const [controlBingMap, controlDispatchBingMap] = useReducer(controlReducer, initState)
  const [controlGMap, controlDispatchGMap] = useReducer(controlReducer, initState)
  const [controlLeaflet, controlDispatchLeaflet] = useReducer(controlReducer, initState)
  controls[controlIds.BING] = controlBingMap
  controls[controlIds.GMAP] = controlGMap
  controls[controlIds.LEAFLET] = controlLeaflet
  controlsDispatch[controlIds.BING] = controlDispatchBingMap
  controlsDispatch[controlIds.GMAP] = controlDispatchGMap
  controlsDispatch[controlIds.LEAFLET] = controlDispatchLeaflet

  infoWithAction(infoCommandItem, setIsModalOpen)
  goToWithAction(gotoCommandItems, cities, statusDispatch)
  withAction(zoomCommandItem, () => {
    statusDispatch({
      type: 'zoom',
      zoom: 5,
      targetId: controlIds.BING,
    })
  })
  withAction(zoomOutLeaflet, () => {
    controlDispatchLeaflet({
      type: 'zoomOut',
    })
  })
  withAction(zoomInLeaflet, () => {
    controlDispatchLeaflet({
      type: 'zoomIn',
    })
  })
  withAction(zoomOutGMap, () => {
    controlDispatchGMap({
      type: 'zoomOut',
      callerId: 4000,
    })
  })
  withAction(zoomInGMap, () => {
    controlDispatchGMap({
      type: 'zoomIn',
      callerId: 5000,
    })
  })
  withAction(zoomBingMap[0], () => {
    controlDispatchBingMap({
      type: 'zoomIn',
    })
  })
  withAction(zoomBingMap[1], () => {
    controlDispatchBingMap({
      type: 'zoomOut',
    })
  })

  useEffect(() => {
    Object.entries(controlsDispatch)
      .filter(e => e[0] !== status.callerId)
      .forEach(element => {
        element[1]({ type: 'center', center: status.center })
      })
  }, [status.center])
  useEffect(() => {
    // const { targetId } = status
    // if (targetId) {
    //   controlsDispatch[targetId]({
    //     type: 'zoom',
    //     zoom: status.zoom,
    //   })
    // }
    Object.values(controlsDispatch)
      .forEach(e => {
        e({
          type: 'zoom',
          zoom: status.zoom,
        })
      })
  }, [status.zoom])

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <InfoModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
        <MainHeader
          title="MapLab"
          items={[
            repoCommandItem,
            gotoCommandItems,
            zoomCommandItem,
            ...zoomBingMap,
            zoomInGMap,
            zoomOutGMap,
            zoomInLeaflet,
            zoomOutLeaflet,
          ]}
          farItems={[infoCommandItem]}
        />
        <div className={sheet.classes.frame}>
          <BingMap
            controlId={controlIds.BING}
            config={config}
            control={controls[controlIds.BING]}
            statusDispatch={statusDispatch}
          />
          <GMap
            controlId={controlIds.GMAP}
            mainClassName={sheet.classes.gMap}
            control={controls[controlIds.GMAP]}
            statusDispatch={statusDispatch}
          />
          <LMap
            controlId={controlIds.LEAFLET}
            mainClassName={sheet.classes.lMap}
            control={controls[controlIds.LEAFLET]}
            statusDispatch={statusDispatch}
            idName="leaflet"
          />
        </div>
      </section>
    </>
  )
}

export default App
