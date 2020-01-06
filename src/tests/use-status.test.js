import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import useMapStatus from '../hooks/use-map-status'

Enzyme.configure({ adapter: new Adapter() })

const initLatLng = [0, 0]
function TC() {
  const [mapStatus, mapStatusActions] = useMapStatus({
    center: initLatLng,
    zoomLevel: 12,
    viewPortRadius: 0,
  })

  return (
    <div>
      <div id="center">
        <i>{mapStatus.center.toString()}</i>
        <button
          type="button"
          onClick={latLng => mapStatusActions.center(latLng)}
        />
      </div>
      <div id="zoom-level">
        <i>{mapStatus.zoomLevel.toString()}</i>
        <button
          type="button"
          onClick={latLng => mapStatusActions.zoomLevel(latLng)}
        />
      </div>
      <div id="viewport-radius">
        <i>{mapStatus.viewPortRadius.toString()}</i>
        <button
          type="button"
          onClick={latLng => mapStatusActions.viewPortRadius(latLng)}
        />
      </div>
    </div>
  )
}
describe('useStatus', () => {
  test('should have certain elements', async () => {
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    expect(wrapper.find('#center').length).toBe(1)
  })
  test('should change state with action mapStatusActions.center', () => {
    const expectedValue = [20, 40]
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    act(() => {
      wrapper.find('#center button').prop('onClick')(expectedValue)
    })
    expect(wrapper.find('#center i').text()).toBe(expectedValue.toString())
  })
  test('should change state with action mapStatusActions.zoomLevel', () => {
    const expectedValue = 1
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    act(() => {
      wrapper.find('#zoom-level button').prop('onClick')(expectedValue)
    })
    expect(wrapper.find('#zoom-level i').text()).toBe(expectedValue.toString())
  })
  test('should change state with action mapStatusActions.viewPortRadius', () => {
    const expectedValue = 50000
    let wrapper
    act(() => { wrapper = mount(<TC />) })
    act(() => {
      wrapper.find('#viewport-radius button').prop('onClick')(expectedValue)
    })
    expect(wrapper.find('#viewport-radius i').text()).toBe(expectedValue.toString())
  })
})
