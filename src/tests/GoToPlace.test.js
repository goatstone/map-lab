import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import GoToPlace from '../components/GoToPlace'

Enzyme.configure({ adapter: new Adapter() })

const mockMoveCenterBy = jest.fn()
const buttonConfig = [
  ['Seattle', [47.6, -122.3]],
  ['New York', [40.7128, -74.0060]],
  ['Los Angeles', [34.0522, -118.2437]],
]

describe('<GoToPlace />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = mount(
        <GoToPlace
          buttonConfig={buttonConfig}
          setMoveCenterBy={() => null}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
  it('should have three buttons', () => {
    let wrapper
    act(() => {
      wrapper = mount(
        <GoToPlace
          buttonConfig={buttonConfig}
          setMoveCenterBy={() => null}
        />,
      )
    })
    expect(wrapper.find('button').length).toBe(3)
  })
  it('should call setMoveCenterBy on button clicked', () => {
    let wrapper
    act(() => {
      wrapper = mount(
        <GoToPlace
          buttonConfig={buttonConfig}
          setMoveCenterBy={mockMoveCenterBy}
        />,
      )
    })
    // click button
    wrapper.find('button').first().props().onClick()
    // has setMoveCenterBy been called?
    expect(mockMoveCenterBy.mock.calls.length).toBe(1)
  })
})
