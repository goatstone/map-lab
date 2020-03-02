import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import GoToPlace from '../components/GoToPlace'

Enzyme.configure({ adapter: new Adapter() })

const mockMoveCenterBy = jest.fn()

describe('<GoToPlace />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = mount(
        <GoToPlace
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
