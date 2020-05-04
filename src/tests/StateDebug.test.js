import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import StateDebug from '../components/StateDebug'

Enzyme.configure({ adapter: new Adapter() })

describe('<StateDebug />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <StateDebug
          status={{ a: 1 }}
          isShow={false}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
