const withAction = (commandItem, action) => {
  Object.assign(
    commandItem,
    {
      onClick: action,
    },
  )
}

export default withAction
