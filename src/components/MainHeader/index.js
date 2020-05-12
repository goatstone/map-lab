import React from 'react'
import PropTypes from 'prop-types'
import {
  CommandBar,
} from '@fluentui/react'

const items = [
  {
    key: 'd',
    text: 'Git',
    iconProps: { iconName: 'repo' },
    href: 'https://github.com/JoseHerminioCollas/map-lab',
  },
]
const MainHeader = ({ setIsModalOpen }) => {
  const farItems = [
    {
      key: 'info',
      text: 'Info',
      // This needs an ariaLabel since it's icon-only
      ariaLabel: 'Info',
      iconOnly: true,
      iconProps: { iconName: 'Info' },
      onClick: () => setIsModalOpen(true),
    },
  ]

  return (
    <header>
      <h1>
        MapLab
      </h1>
      <CommandBar
        items={items}
        farItems={farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </header>
  )
}
/* eslint-disable react/forbid-prop-types */
MainHeader.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
}

export default MainHeader
