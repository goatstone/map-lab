import { DrawerAlign } from './components/DrawerContainer'

const DrawContainerConfig = {
  search: {
    yPosition: 0,
    alignX: DrawerAlign.LEFT,
    title: 'Search',
    initIsOpen: true,
    id: 'search',
  },
  goToPlace: {
    yPosition: 0,
    alignX: DrawerAlign.RIGHT,
    title: 'Go To',
    initIsOpen: true,
    id: 'go-to-place',
  },
  moveTo: {
    yPosition: 50,
    alignX: DrawerAlign.RIGHT,
    title: 'Move',
    width: 180,
    initIsOpen: true,
    id: 'move-to',
  },
  motion: {
    yPosition: 150,
    alignX: DrawerAlign.RIGHT,
    title: 'Motion',
    width: 100,
    initIsOpen: true,
    id: 'motion',
  },
}

export default DrawContainerConfig
