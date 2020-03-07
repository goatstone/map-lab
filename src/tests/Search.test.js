import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Search from '../components/Search'

Enzyme.configure({ adapter: new Adapter() })

describe('<Search />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <Search
          initSearchValue=""
          radius={10}
          center={[0, 0]}
          setPlaceQuery={() => {}}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
