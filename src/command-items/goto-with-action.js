
const goToWithAction = (gotoCommandItems, cities, listener) => {
  let i = 0
  while (i < gotoCommandItems.subMenuProps.items.length) {
    const { key } = gotoCommandItems.subMenuProps.items[i]
    if (!key) throw new Error('city data not found')
    const latLng = cities[key]
    Object.assign(
      gotoCommandItems.subMenuProps.items[i],
      { onClick: () => listener(latLng) },
    )
    i += 1
  }
}

export default goToWithAction
