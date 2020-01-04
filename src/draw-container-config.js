import { DrawerAlign } from './components/DrawerContainer'

// DrawContainerConfig
const DCConfig = {
  search: {
    yPosition: 0,
    alignX: DrawerAlign.LEFT,
    title: 'Search',
    initIsOpen: true,
  },
  goToPlace: {
    yPosition: 0,
    alignX: DrawerAlign.RIGHT,
    title: 'Go To',
    initIsOpen: true,
  },
  moveTo: {
    yPosition: 50,
    alignX: DrawerAlign.RIGHT,
    title: 'Move',
    width: 180,
    initIsOpen: true,
  },
  motion: {
    yPosition: 150,
    alignX: DrawerAlign.RIGHT,
    title: 'Motion',
    width: 100,
    initIsOpen: true,
  },
}

export default DCConfig
