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
    test('should change the tick value', async () => {
      let wrapper
      act(() => { wrapper = mount(<TC />) })
      expect(wrapper.find('#tick').text()).toBe('0')
      // start the engine
      act(() => {
        wrapper.find('#set-engine-true').props().onClick()
      })
      // wait for two seconds
      const a = await new Promise(resolve => {
        setTimeout(() => resolve(2), 2000)
      })
      const tickValue = Number(wrapper.find('#tick').text())
      expect(tickValue).toBeGreaterThan(0)
      expect(a).toBe(2)
    })
  })
})
