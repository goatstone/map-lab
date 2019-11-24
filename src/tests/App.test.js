import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../components/App'

Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <App />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
