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
const control = {
  center: initLatLng,
  zoom: { leaflet: 0, gmap: 0 },
}
const statusDispatch = {
  center: () => 1,
}
const props = {
  control,
  statusDispatch,
}

beforeEach(() => {
  jest.resetModules()
})

describe('index', () => {
  beforeAll(() => {
    global.window = window
    global.document = window.document
  })
  it.skip('should run file that mounts top level components', () => {
    Object.defineProperty(document, 'getElementById', {
      value: () => document.createElement('div'),
    })
    try {
      const el = document.createElement('div')
      el.setAttribute('id', 'map')
      document.body.appendChild(el)
      let wrapper
      act(() => { wrapper = mount(<Map {...props} />) })
      expect(wrapper).toBeTruthy()
    } catch (error) {
      // fail the test on error
      expect(false).toBe(true)
    }
  })
})
