import React from 'react'
import PropTypes from 'prop-types'
import {
  CommandBar,
} from '@fluentui/react'

const MainHeader = ({ title = '', commandItems }) => (
  <header>
    <h1>
      {title}
    </h1>
    <CommandBar
      items={commandItems.main}
      farItems={commandItems.far}
      ariaLabel="Use left and right arrow keys to navigate between commands"
    />
  </header>
)
/* eslint-disable react/forbid-prop-types */
MainHeader.propTypes = {
  commandItems: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default MainHeader
