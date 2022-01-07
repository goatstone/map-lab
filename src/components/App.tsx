import React, { useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import {
  InfoModal,
} from '.'
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

const tileUrls = {
  World_Hillshade: 'https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
  World_Imagery: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  World_Street_Map: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  NatGeo_World_Map: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
  openstreetmap: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
}

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
            url={tileUrls.World_Hillshade}
          />
          <MapWrapper
            id={100000}
            appService={applicationService}
            url={tileUrls.World_Imagery}
          />
          <GibsMap
            id={10}
            appService={applicationService}
          />
          <MapWrapper
            id={99}
            appService={applicationService}
            url={tileUrls.World_Street_Map}
          />
        </div>
      </section>
    </>
  )
}

export default App
