const main = [
  {
    key: 'a',
    text: 'Git',
    iconProps: { iconName: 'repo' },
    href: 'https://github.com/JoseHerminioCollas/map-lab',
  },
  {
    key: 'b',
    text: 'Go To',
    iconProps: { iconName: 'arrow' },
    subMenuProps: {
      items: [{
        key: 'c',
        text: 'Seattle',
      },
      {
        key: 'd',
        text: 'Los Angeles',
      }],
    },
  },
]
const far = [
  {
    key: 'info',
    text: 'Info',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
  },
]
const commandItems = { main, far }

export default commandItems
