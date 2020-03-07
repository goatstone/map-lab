import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MoveTo from '../components/MoveTo'

Enzyme.configure({ adapter: new Adapter() })

const mockSetMoveCenterBy = jest.fn()
const mockSetMoveMarkerBy = jest.fn()

describe('<MoveTo />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <MoveTo
          setMoveCenterBy={mockSetMoveCenterBy}
          setMoveMarkerBy={mockSetMoveMarkerBy}
        />,
      )
    })
    act(() => {
      wrapper.find('button').get(0).props.onClick()
      wrapper.find('button').get(1).props.onClick()
    })
    expect(wrapper).toBeTruthy()
    expect(mockSetMoveCenterBy.mock.calls.length).toBe(1)
    expect(mockSetMoveMarkerBy.mock.calls.length).toBe(1)
  })
})
