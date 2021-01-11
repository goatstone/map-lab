import React, { useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import {
  InfoModal,
  GibsMap,
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

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()

const applicationService: AppServiceInstanceI = AppService()

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [product, setProduct] = useState('MODIS_Terra_CorrectedReflectance_TrueColor')
  infoWithAction(infoCommandItem, setIsModalOpen)
  goToWithAction(gotoCommandItems, cities, applicationService.addCenterStatus)
  withAction(zoomCommandItem, () => {
    applicationService.addZoom(12, 0)
  })

  const cI = {
    key: 'gibs-products',
    text: 'Gibs Products',
    iconProps: { iconName: 'ProductList' },
    subMenuProps: {
      items: [
        {
          key: 'MODIS_Terra_CorrectedReflectance_TrueColor',
          text: 'MODIS_Terra_CorrectedReflectance_TrueColor',
          onClick: () => setProduct('MODIS_Terra_CorrectedReflectance_TrueColor'),
        },
        {
          key: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
          text: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
          onClick: () => setProduct('VIIRS_SNPP_CorrectedReflectance_TrueColor'),
        },
      ],
    },
  }

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
            cI,
          ]}
          farItems={[infoCommandItem]}
        />
        <div className={sheet.classes.frame}>
          <GibsMap
            config={config}
            product={product}
          />
        </div>
      </section>
    </>
  )
}

export default App
