import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Map from '../components/Map'

Enzyme.configure({ adapter: new Adapter() })

describe('<Map />', () => {
  it('should mount', () => {
    const props = {
      markerPosition: [0, 0],
      center: [0, 0],
      placeInfo: { results: [] },
      setSearchQCenter: [0, 0],
      setZoomLevel: 12,
      placeFocusId: 0,
    }
    let wrapper
    act(() => {
      wrapper = shallow(
        <Map
          {...props}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
