
const goToWithAction = (gotoCommandItems, cities, controlDispatch) => {
  let i = 0
  while (i < gotoCommandItems.subMenuProps.items.length) {
    const { key } = gotoCommandItems.subMenuProps.items[i]
    const latLng = cities[key]
    const newO = { onClick: () => controlDispatch({ type: 'center', center: latLng }) }
    Object.assign(gotoCommandItems.subMenuProps.items[i], newO)
    console.log('xxx', key, latLng)
    i += 1
  }
}

export default goToWithAction
