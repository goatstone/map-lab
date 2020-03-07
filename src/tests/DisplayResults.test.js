import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DisplayResults from '../components/DisplayResults'

Enzyme.configure({ adapter: new Adapter() })

describe('<DisplayResults />', () => {
  it('should mount', () => {
    const props = {
      placeInfo: { results: [] },
      setPlaceFocusId: () => 1,
      classNames: { DisplayResults: {} },
    }
    let wrapper
    act(() => {
      wrapper = shallow(
        <DisplayResults
          {...props}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
  it('should call setPlaceFocusId on button press', () => {
    const mockSetPlaceFocusId = jest.fn()
    const props = {
      placeInfo: { results: [{name: 'X', formatted_address: 'X'}] },
      setPlaceFocusId: mockSetPlaceFocusId,
      classNames: { displayResults: {} },
    }
    let wrapper
    act(() => {
      wrapper = shallow(
        <DisplayResults
          {...props}
        />,
      )
    })
    act(() => {
        wrapper.find('li').first().props().onClick()
    })
    expect(mockSetPlaceFocusId.mock.calls.length).toBe(1)
  })
})
