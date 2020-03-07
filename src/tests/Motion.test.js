import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Motion from '../components/Motion'

Enzyme.configure({ adapter: new Adapter() })

describe('<Motion />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <Motion
          isRunnningEngine={false}
          setEngine={() => 1}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
