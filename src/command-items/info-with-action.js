// commandItem onClickAction () => {}
// add an onClick porrop to command Item
const infoWithAction = (infoCommandItem, setIsModalOpen) => {
  Object.assign(
    infoCommandItem,
    {
      onClick: () => setIsModalOpen(true),
    },
  )
}

export default infoWithAction
