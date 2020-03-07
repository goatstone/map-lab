import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import useEngine from '../hooks/use-engine'

Enzyme.configure({ adapter: new Adapter() })

function TC() {
  const [isRunningEngine, setEngine, tick] = useEngine()
  return (
    <div>
      <button
        type="button"
        id="set-engine-true"
        onClick={() => setEngine(true)}
      >
        set engine
      </button>
      <div id="tick">
        {tick}
      </div>
      <div id="is-running">{isRunningEngine ? 'true' : 'false'}</div>
      XXXXX
    </div>
  )
}
jest.useFakeTimers()
describe('use-engine', () => {
  test('should be a function', () => {
    expect(typeof useEngine).toBe('function')
  })
  test('should have certain elements', async () => {
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    expect(wrapper.find('button#set-engine-true').length).toBe(1)
  })
  describe('setEngine function', () => {
    test('should effect the >isRunningEngine< boolean value', async () => {
      let wrapper
      act(() => { wrapper = mount(<TC />) })
      expect(wrapper.find('#is-running').text()).toBe('false')
      act(() => {
        wrapper.find('#set-engine-true').props().onClick()
      })
      expect(wrapper.find('#is-running').text()).toBe('true')
    })
    test('should increment the tick value', async () => {
      let wrapper
      let tickValue = 0
      act(() => { wrapper = mount(<TC />) })
      expect(wrapper.find('#tick').text()).toBe('0')
      // start the engine
      act(() => {
        wrapper.find('#set-engine-true').props().onClick()
      })
      // advance time
      act(() => {
        jest.advanceTimersByTime(2000)
      })
      act(() => {
        tickValue = Number(wrapper.find('#tick').text())
      })
      expect(tickValue).toBeGreaterThan(0)
    })
  })
})
