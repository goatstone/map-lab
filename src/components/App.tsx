import React, { useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import { InfoModal, GibsMap } from '.'
import MainHeader from './MainHeader'
import { infoCommandItem, infoWithAction } from '../command-items'
import config from '../config'
import productSelect from './gibs-map/ui/product-select'

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [product, setProduct] = useState<string>('MODIS_Terra_CorrectedReflectance_TrueColor')
  infoWithAction(infoCommandItem, setIsModalOpen)

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <InfoModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
        <MainHeader
          title="Nasa Layers"
          items={[
            productSelect(setProduct),
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
