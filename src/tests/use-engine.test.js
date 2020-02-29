import React, { useEffect } from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import useEngine from '../hooks/use-engine'

Enzyme.configure({ adapter: new Adapter() })

function TC() {
  const [isRunningEngine, setEngine, tick] = useEngine()
  useEffect(() => {
    // setEngine(true)
    // console.log('effect', tick, isRunningEngine)
    // setTimeout(() => setEngine(false), 10000)
  }, [])
  useEffect(() => {
    // console.log('effect', tick)
  }, [tick])
  return (
    <div>
      <button
        id="set-engine-true"
        onClick={() => setEngine(true)}
      >
        set engine
    </button>
    <div id="is-running">{isRunningEngine? 'true': 'false'}</div>
      XXXXX
    </div>
  )
}

describe('use-engine', () => {
  it('should be a function', () => {
    expect(typeof useEngine).toBe('function')
  })
  test('should have certain elements', async () => {
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    expect(wrapper.find('button#set-engine-true').length).toBe(1)
  })
  test('should effect the >isRunningEngine< boolean value', async () => {
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    act(() => { 
      wrapper.find('#set-engine-true').props().onClick()
    })
    expect(wrapper.find('#is-running').text()).toBe('true')
  })
})
