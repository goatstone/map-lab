import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MainHeader from '../components/MainHeader'

Enzyme.configure({ adapter: new Adapter() })

describe('<MainHeader />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <MainHeader
          title="X"
          items={[]}
          farItems={[]}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
