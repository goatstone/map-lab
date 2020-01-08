import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'
import React from 'react'
import { act } from 'react-dom/test-utils'
import Map from '../components/Map'

Enzyme.configure({ adapter: new Adapter() })
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

const initLatLng = [47.6, -122.3]
const mapStatus = {
  center: [initLatLng],
  zoomLevel: 12,
  viewPortRadius: 50000,
}
const mapControl = {
  moveCenterTo: initLatLng,
  moveMarkerTo: initLatLng,
  placeFocusId: null,
}
const mapStatusActions = {
  center: () => 1,
  zoomLevel: () => 1
}
const placeInfo = []
const props = {
  placeInfo,
  mapControl,
  mapStatusActions,
}

beforeEach(() => {
  jest.resetModules()
})

describe('index', () => {
  beforeAll(() => {
    global.window = window
    global.document = window.document
  })
  it('should run file that mounts top level components', () => {
    Object.defineProperty(document, 'getElementById', {
      value: () => document.createElement('div'),
    })
    try {
      const el = document.createElement('div')
      el.setAttribute('id', 'map')
      document.body.appendChild(el)
      const el2 = document.querySelector('#map')
      let wrapper
      act(() => { wrapper = mount(<Map {...props} />) })
      expect(wrapper).toBeTruthy()
  } catch (error) {
    console.log(error)
      // fail the test on error
      expect(false).toBe(true)
    }
  })
})
