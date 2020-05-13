import commandItems from './command-items'

const cities = [
  ['Seattle', [47.6062, -122.3321]],
  ['Los Angeles', [34.05349, -118.24532]],
  ['Miami', [25.77481, -80.1977]],
  ['Austin', [30.26759, -97.74299]],
  ['Vancouver', [49.26038, -123.11336]],
  ['Madrid', [40.42028, -3.70577]],
  ['Paris', [48.863186, 2.339754]],
]

const commandItemsWithAction = (setIsModalOpen, controlDispatch) => {
  Object.assign(
    commandItems.far[0],
    {
      onClick: () => setIsModalOpen(true),
    },
  )
  cities.forEach(city => {
    const o = {
      key: city[0],
      onClick: () => controlDispatch({ type: 'center', center: city[1] }),
      text: city[0],
    }
    commandItems.main[1].subMenuProps.items.push(o)
  })

  return commandItems
}
export default commandItemsWithAction
