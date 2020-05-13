import commandItems from './command-items'

const cities = [
  ['Seattle', [47.6062, -122.3321]],
  ['Los Angeles', [32.965557, -96.715836]],
  ['Miami', [25.47, 80.13]],
  ['Austin', [30.15, 97.45]],
  ['Vancouver', [49.15, 123.06]],
  ['Madrid', [40.23, 3.43]],
  ['Paris', [48.51, 2.21]],
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
