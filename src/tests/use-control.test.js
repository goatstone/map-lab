import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import useMapControl from '../hooks/use-map-control'

Enzyme.configure({ adapter: new Adapter() })

const initLatLng = [0, 0]
const expectedLatLng = [20, 20]
function TC() {
  const [mapControl, actions] = useMapControl({
    moveCenterTo: initLatLng,
    moveMarkerTo: initLatLng,
    placeFocusId: null,
  })

  return (
    <div>
      <div id="move-center-by">
        <i>{mapControl.moveCenterTo.toString()}</i>
        <button
          type="button"
          onClick={() => actions.setMoveCenterBy(expectedLatLng)}
        />
      </div>
      <div id="move-center-to">
        <i>{mapControl.moveCenterTo.toString()}</i>
        <button
          type="button"
          onClick={() => actions.setMoveCenterTo(expectedLatLng)}
        />
      </div>
      <div id="move-marker-by">
        <i>{mapControl.moveMarkerTo.toString()}</i>
        <button
          type="button"
          onClick={() => actions.setMoveMarkerBy(expectedLatLng)}
        />
      </div>
    </div>
  )
}
describe('useControl', () => {
  test('should have certain elements', async () => {
    let wrapper
    act(() => {
      wrapper = mount(<TC />)
    })
    expect(wrapper.find('#move-center-by').length).toBe(1)
    expect(wrapper.find('#move-center-to').length).toBe(1)
    expect(wrapper.find('#move-marker-by').length).toBe(1)
    expect(wrapper.find('#move-marker-by button').length).toBe(1)
    expect(wrapper.find('#move-marker-by i').length).toBe(1)
  })

})
