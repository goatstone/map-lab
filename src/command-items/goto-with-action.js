
const goToWithAction = (gotoCommandItems, cities, controlDispatch) => {
  let i = 0
  while (i < gotoCommandItems.subMenuProps.items.length) {
    const { key } = gotoCommandItems.subMenuProps.items[i]
    if (!key) throw new Error('city data not found')
    const latLng = cities[key]
    Object.assign(
      gotoCommandItems.subMenuProps.items[i],
      { onClick: () => controlDispatch({ type: 'center', center: latLng }) },
    )
    i += 1
  }
}

export default goToWithAction
