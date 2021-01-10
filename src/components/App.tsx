import React, { useEffect, useState } from 'react'
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
  infoWithAction,
  goToWithAction,
  withAction,
} from '../command-items'
import { cities } from '../data'
import config from '../config'
import AppService, { AppServiceInstanceI } from '../app-service'
import timerEngine from '../timer-engine'

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()

const applicationService: AppServiceInstanceI = AppService()

function App() {
  const id = 0
  const [mapCenter, setMapCenter] = useState([47.6, -122.3])
  const [mapZoom, setMapZoom] = useState(12)

  const tE = timerEngine()
  tE.onMessage(message => console.log('message', message))

  useEffect(() => {
    applicationService.addCenterEventListener(center => {
      setMapCenter(center)
    }, id)
    applicationService.addZoomEventListener(zoom => setMapZoom(zoom), 100)
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)

  infoWithAction(infoCommandItem, setIsModalOpen)
  goToWithAction(gotoCommandItems, cities, applicationService.addCenterStatus)
  withAction(zoomCommandItem, () => {
    applicationService.addZoom(12, 0)
  })

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <div className="info">
          {mapCenter}
          :
          {mapZoom}
        </div>
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
          ]}
          farItems={[infoCommandItem]}
        />
        <div className={sheet.classes.frame}>
          <BingMap
            config={config}
            id={10}
            appService={applicationService}
            timerEngine={tE}
          />
          <GMap
            mainClassName={sheet.classes.gMap}
            id={100}
            appService={applicationService}
            timerEngine={tE}
          />
          <LMap
            id={1000}
            appService={applicationService}
            mainClassName={sheet.classes.lMap}
            idName="leaflet"
          />
        </div>
      </section>
    </>
  )
}

export default App
