import repoCommandItem from './repo'
import gotoCommandItems from './goto'
import infoCommandItem from './info'
import zoomCommandItem from './zoom'
import infoWithAction from './info-with-action'
import goToWithAction from './goto-with-action'
import withAction from './with-action'

const zoomOutLeaflet = {
  key: 'zoomOut',
  text: 'Zoom Out',
  iconProps: { iconName: 'zoomout' },
  split: true,
  className: 'zoom-command-item',
}
const zoomInLeaflet = {
  key: 'zoom-in',
  text: 'Zoom In',
  iconProps: { iconName: 'zoomin' },
  className: 'zoom-command-item',
}

export {
  repoCommandItem,
  gotoCommandItems,
  infoCommandItem,
  zoomCommandItem,
  zoomInLeaflet,
  zoomOutLeaflet,
  infoWithAction,
  goToWithAction,
  withAction,
}
