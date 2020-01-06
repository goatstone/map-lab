import React from 'react'
import { render } from '@testing-library/react'
import useMapControl from '../hooks/use-map-control'

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
      DIVHOOK
      <i>abc</i>
      <div id="movecenter">{mapControl.moveCenterTo.toString()}</div>
      <button
        type="button"
        onClick={() => actions.setMoveCenterTo(expectedLatLng)}
      />
    </div>
  )
}
test('useControl', async () => {
  const { getByText } = render(<TC />)
  const el = getByText('DIVHOOK')
  expect(el.querySelector('i').innerHTML).toBe('abc')
  el.querySelector('button').click()
  expect(el.querySelector('#movecenter').innerHTML)
    .toBe(expectedLatLng.toString())
})
