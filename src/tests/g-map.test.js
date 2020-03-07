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
const mockZoomLevel = jest.fn(level => level)
const props = {
  mapControl: {
    moveCenterTo: [0, 0],
    places: [],
  },
  mapStatusActions: {
    zoomLevel: mockZoomLevel,
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
  // the mockZoomLevel does not get updated!!!
  it.skip('should update zoomLevel status on zoomLevel change', () => {
    let wrapper
    act(() => { wrapper = mount(<GMap {...props} />) })
    act(() => { wrapper.simulate('doubleClick') })
    expect(mockZoomLevel.mock.calls.length).toBe(1)
  })
})
