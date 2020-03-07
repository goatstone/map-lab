import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DrawerContainer, { DrawerAlign } from '../components/DrawerContainer'

Enzyme.configure({ adapter: new Adapter() })

describe('<DrawerContainer />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <DrawerContainer
          {...{
            yPosition: 0,
            alignX: DrawerAlign.LEFT,
            title: 'Search',
            initIsOpen: true,
            id: 'search',
          }}
          classNames={{ classNames: '' }}
        >
          XXX
        </DrawerContainer>,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
