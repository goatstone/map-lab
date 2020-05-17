import repoCommandItem from './repo'
import gotoCommandItems from './goto'
import infoCommandItem from './info'
import zoomCommandItem from './zoom'
import infoWithAction from './info-with-action'
import goToWithAction from './goto-with-action'
import withAction from './with-action'

const zoomOutLeaflet = {
  key: 'zoom-out-leaflet',
  // text: 'Zoom Out',
  iconProps: { iconName: 'zoomout' },
  split: true,
  className: 'zoom-command-item-leaflet',
}
const zoomInLeaflet = {
  key: 'zoom-in-leaflet',
  // text: 'Zoom In',
  iconProps: { iconName: 'zoomin' },
  className: 'zoom-command-item-leaflet',
}
const zoomOutGmap = {
  key: 'zoom-out-gmap',
  // text: 'Zoom Out',
  iconProps: { iconName: 'zoomout' },
  className: 'zoom-command-item-gmap',
}
const zoomInGMap = {
  key: 'zoom-in-gmap',
  // text: 'Zoom In',
  iconProps: { iconName: 'zoomin' },
  className: 'zoom-command-item-gmap',
}

export {
  repoCommandItem,
  gotoCommandItems,
  infoCommandItem,
  zoomCommandItem,
  zoomInLeaflet,
  zoomOutLeaflet,
  zoomInGMap,
  zoomOutGmap,
  infoWithAction,
  goToWithAction,
  withAction,
}
