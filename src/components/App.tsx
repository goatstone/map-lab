import React, { useEffect, useState } from 'react'
import { initializeIcons, Slider } from '@fluentui/react'
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
  const [day, setDay] = useState<number>(10)
  const [month, setMonth] = useState<number>(7)
  const [year, setYear] = useState<number>(2003)
  const [date, setDate] = useState('2003-08-10')
  infoWithAction(infoCommandItem, setIsModalOpen)
  useEffect(() => {
    const userSelectedDate = new Date(year, month, day)
    setDate(
      `${userSelectedDate
        .getFullYear()}-${String(userSelectedDate
        .getMonth()).padStart(2, '0')}-${String(userSelectedDate
        .getDate()).padStart(2, '0')}`,
    )
  }, [year, month, day])

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
        >
          <>
            <Slider
              label="Day"
              min={1}
              max={30}
              value={day}
              showValue
              onChange={(dayValue: number) => setDay(dayValue)}
            />
            <Slider
              label="Month"
              min={1}
              max={12}
              value={month}
              showValue
              onChange={(monthValue: number) => setMonth(monthValue)}
            />
            <Slider
              label="Year"
              min={2003}
              max={2020}
              value={year}
              showValue
              onChange={(yearValue: number) => setYear(yearValue)}
            />
          </>
        </MainHeader>
        <div className={sheet.classes.frame}>
          <GibsMap
            config={config}
            product={product}
            date={date}
          />
        </div>
      </section>
    </>
  )
}

export default App
