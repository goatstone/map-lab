import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MoveTo from '../components/MoveTo'

Enzyme.configure({ adapter: new Adapter() })

describe('<MoveTo />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <MoveTo
          mapCenter={[0, 0]}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
