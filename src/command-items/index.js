import repoCommandItem from './repo'
import gotoCommandItems from './goto'
import infoCommandItem from './info'
import zoomCommandItem from './zoom'
import infoWithAction from './info-with-action'
import goToWithAction from './goto-with-action'
import withAction from './with-action'

const zoomOutLeaflet = {
  key: 'zoom-out-leaflet',
  iconProps: { iconName: 'zoomout' },
  split: true,
  className: 'zoom-command-item-leaflet',
}
const zoomInLeaflet = {
  key: 'zoom-in-leaflet',
  iconProps: { iconName: 'zoomin' },
  className: 'zoom-command-item-leaflet',
}
const zoomOutGMap = {
  key: 'zoom-out-gmap',
  iconProps: { iconName: 'zoomout' },
  className: 'zoom-command-item-gmap',
}
const zoomInGMap = {
  key: 'zoom-in-gmap',
  iconProps: { iconName: 'zoomin' },
  className: 'zoom-command-item-gmap',
}
const zoomBingMap = [{
  key: 'zoom-in-bingmap',
  iconProps: { iconName: 'zoomin' },
  className: 'zoom-command-item-bingmap',
},
{
  key: 'zoom-out-bingmap',
  iconProps: { iconName: 'zoomout' },
  className: 'zoom-command-item-bingmap',
},
]

export {
  repoCommandItem,
  gotoCommandItems,
  infoCommandItem,
  zoomCommandItem,
  zoomInLeaflet,
  zoomOutLeaflet,
  zoomInGMap,
  zoomOutGMap,
  zoomBingMap,
  infoWithAction,
  goToWithAction,
  withAction,
}
