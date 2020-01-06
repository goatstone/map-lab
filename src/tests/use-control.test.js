import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import useMapControl from '../hooks/use-map-control'

Enzyme.configure({ adapter: new Adapter() })

const initLatLng = [0, 0]
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
          onClick={latLng => actions.setMoveCenterBy(latLng)}
        />
      </div>
      <div id="move-center-to">
        <i>{mapControl.moveCenterTo.toString()}</i>
        <button
          type="button"
          onClick={latLng => actions.setMoveCenterTo(latLng)}
        />
      </div>
      <div id="move-marker-by">
        <i>{mapControl.moveMarkerTo.toString()}</i>
        <button
          type="button"
          onClick={latLng => actions.setMoveMarkerBy(latLng)}
        />
      </div>
    </div>
  )
}
describe('useControl', () => {
  test('should have certain elements', async () => {
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    expect(wrapper.find('#move-center-by').length).toBe(1)
    expect(wrapper.find('#move-center-to').length).toBe(1)
    expect(wrapper.find('#move-marker-by').length).toBe(1)
    expect(wrapper.find('#move-marker-by button').length).toBe(1)
    expect(wrapper.find('#move-marker-by i').length).toBe(1)
  })
  test('should change state with action setMoveMarkerrBy', () => {
    const expectedValue = [20, 40]
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    act(() => {
      wrapper.find('#move-marker-by button').prop('onClick')(expectedValue)
    })
    expect(wrapper.find('#move-marker-by i').text()).toBe(expectedValue.toString())
  })
  test('should change state with action setMoveCenterBy', () => {
    const expectedOffset = [1, 1]
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    act(() => {
      wrapper.find('#move-center-by button').prop('onClick')(expectedOffset)
    })
    expect(wrapper.find('#move-center-by i').text()).toBe(expectedOffset.toString())
  })
  test('should change state with action setMoveCenterTo', () => {
    const expectedOffset = [1, 1]
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    act(() => {
      wrapper.find('#move-center-to button').prop('onClick')(expectedOffset)
    })
    expect(wrapper.find('#move-center-to i').text()).toBe(expectedOffset.toString())
  })
})
