
const infoWithAction = (infoCommandItem, setIsModalOpen) => {
  Object.assign(
    infoCommandItem,
    {
      onClick: () => setIsModalOpen(true),
    },
  )
}

export default infoWithAction
