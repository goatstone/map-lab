import {
  IconButton,
  Modal,
  mergeStyleSets,
  getTheme,
} from '@fluentui/react'
import React from 'react'
import PropTypes from 'prop-types'

const theme = getTheme()
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    fontSize: '1.4em',
    padding: '1em',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'center',
      padding: 0,
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
})
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
}
const cancelIcon = { iconName: 'Cancel' }

const InfoModal = ({ setIsModalOpen, isModalOpen }) => (
  <Modal
    // titleAriaId={titleId}
    isOpen={isModalOpen}
    onDismiss={() => setIsModalOpen(false)}
    isBlocking={false}
    containerClassName={contentStyles.container}
    dragOptions={false}
  >
    <div className={contentStyles.header}>
      <IconButton
        styles={iconButtonStyles}
        iconProps={cancelIcon}
        ariaLabel="Close popup modal"
        onClick={() => setIsModalOpen(false)}
      />
    </div>
    <h2>Nasa Layers</h2>
    <p>
      Images from&nbsp;
      <a href="https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs" target="new">
        Global Imagery Browse Services (GIBS)
      </a>
    </p>
    <p>
      &copy;&nbsp;
      <a href="https://www.goatstone.com" target="new">Goatstone</a>
      &nbsp;
      2021
    </p>
  </Modal>
)
/* eslint-disable react/forbid-prop-types */
InfoModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
}
export default InfoModal
