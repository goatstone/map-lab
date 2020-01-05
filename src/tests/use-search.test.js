import React, { useState } from "react"
import { render, wait } from "@testing-library/react"
// import useSearch from "../hooks/use-search";
// import "jest-dom/extend-expect"
// jest.mock("./api/posts");

function TC() {
  const [s, setS] = useState(20) // search results
  const [q, setQ] = useState('a') // query
  return (
    <div>
      <div id="q">
        {q}
      </div>
      <div id="state">
        {s}
      </div>
      <div>xx</div>
      abc
      <button
        type="button"
        onClick={() => {
          console.log('click')
          setQ('999')
          return 1
        }}
      >
        xxx
      </button>
    </div>
  )
}

test('expect hook state to update', async () => {
  const { getByText } = render(<TC />)
  const el = getByText('abc')
  const sVal = el.querySelector('#state').innerHTML
  expect(sVal).toBe('20')
  el.querySelector('button').click()
  await wait(() => {
    const sVal2 = el.querySelector('#q').innerHTML
    expect(sVal2).toBe('999')
  })
  console.log(el.querySelector('#state').innerHTML)
});