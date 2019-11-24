import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DisplayResults from '../components/DisplayResults'

Enzyme.configure({ adapter: new Adapter() })

const mocknameUpdateMode = jest.fn(() => 1)
describe('<DisplayResults />', () => {
  it('should mount', () => {
    const props = {
      placeInfo: {results: []},
      setPlaceFocusId: 1,
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
})
