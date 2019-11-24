import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Control from '../components/Control'

Enzyme.configure({ adapter: new Adapter() })

describe('<Control />', () => {
  it('should mount', () => {
    const props = {
      placeQueryInput: 'X',
      setPlaceQueryInput: jest.fn(() => true),
      setPlaceQuery: jest.fn(() => true),
      moveCenterBy: jest.fn(() => true),
      moveCenterTo: jest.fn(() => true),
      moveMarker: jest.fn(() => true),
      isRunnningEngine: false,
      setEngine: jest.fn(() => true),
    }
    let wrapper
    act(() => {
      wrapper = shallow(
        <Control
          {...props}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
