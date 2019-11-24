import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Information from '../components/Information'

Enzyme.configure({ adapter: new Adapter() })

describe('<Information />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <Information
          mapCenter={[0, 0]}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
