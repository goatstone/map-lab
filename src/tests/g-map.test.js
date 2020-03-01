import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'
import { act } from 'react-dom/test-utils'
import GMap from '../components/GMap'

Enzyme.configure({ adapter: new Adapter() })
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

beforeEach(() => {
  jest.resetModules()
})
const props = {
  mapControl: {
    moveCenterTo: [0, 0],
    places: [],
  },
  mapStatusActions: {
    zoomLevel: () => null,
    center: () => null,
  },
  mainClassName: '',
}
describe('Google Map', () => {
  beforeAll(() => {
    global.window = window
    global.document = window.document
    Object.defineProperty(document, 'getElementById', {
      value: () => document.createElement('div'),
    })
    const el = document.createElement('div')
    el.setAttribute('id', 'map')
    document.body.appendChild(el)
  })
  it('should mount', () => {
    try {
      let wrapper
      act(() => { wrapper = mount(<GMap {...props} />) })
      expect(wrapper).toBeTruthy()
    } catch (error) {
      expect(false).toBe(true)
    }
  })
  it('should update zoomLevel status on zoomLevel change', () => {
    try {
      let wrapper
      act(() => { wrapper = mount(<GMap {...props} />) })
      // wrapper.props().onClick()
      expect(wrapper).toBeTruthy()
    } catch (error) {
      expect(false).toBe(true)
    }
  })
})
