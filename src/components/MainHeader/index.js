import React from 'react'
import PropTypes from 'prop-types'
import {
  CommandBar,
} from '@fluentui/react'

const MainHeader = ({ title = '', items, farItems = [] }) => (
  <header>
    <h1>
      {title}
    </h1>
    <CommandBar
      items={items}
      farItems={farItems}
      ariaLabel="Use left and right arrow keys to navigate between commands"
    />
  </header>
)
/* eslint-disable react/forbid-prop-types */
MainHeader.propTypes = {
  items: PropTypes.array.isRequired,
  farItems: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default MainHeader
