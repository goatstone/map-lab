import React, { useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import {
  InfoModal,
} from '.'
import GoogleMap from './GoogleMap'
import LeafletMap from './LeafletMap'
import MapWrapper from './OpenLayerMap'
import GibsMap from './GibsMap'
import MainHeader from './MainHeader'
import {
  repoCommandItem,
  gotoCommandItems,
  infoCommandItem,
  infoWithAction,
  goToWithAction,
} from '../command-items'
import { cities } from '../data'
import AppService, { AppServiceInstanceI } from '../app-service'

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()

const applicationService: AppServiceInstanceI = AppService()

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  infoWithAction(infoCommandItem, setIsModalOpen)
  goToWithAction(gotoCommandItems, cities, applicationService.addCenterStatus)

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
          ]}
          farItems={[infoCommandItem]}
        />
        <div className="map-frame">
          <MapWrapper
            id={0}
            appService={applicationService}
          />
          <GibsMap
            id={10}
            appService={applicationService}
          />
          <GoogleMap
            id={100}
            appService={applicationService}
          />
          <LeafletMap
            id={1000}
            appService={applicationService}
            idName="leaflet"
            layerType="light"
          />
          <LeafletMap
            id={10000}
            appService={applicationService}
            idName="leaflet-b"
            layerType="satelite"
          />
        </div>
      </section>
    </>
  )
}

export default App
