import React, { useState, useEffect } from "react"
import { render, wait } from "@testing-library/react"
/*
  Test the state of a hook that has been updated with
  the useHooks function
*/
function TC() {
  const [searchResults, setSearchResults] = useState([]) // search results
  const [q, setQ] = useState('a') // query
  useEffect(() => {
    // async functions go here
    setSearchResults([{ a: 2 }, { a: 2 }, {}])
  }, [q])
  return (
    <div alt="test">
      DIVHOOK
      <div id="q">
        {q}
      </div>
      <div id="state">
        {searchResults.length}
      </div>
      <button
        type="button"
        onClick={() => {
          setQ('999')
          return 1
        }}
      >
      XXX
      </button>
    </div>
  )
}
test('expect hook state to update', async () => {
  const { getByText } = render(<TC />)
  const el = getByText('DIVHOOK')
  el.querySelector('button').click()
  await wait(() => {
    const sVal2 = el.querySelector('#q').innerHTML
    expect(sVal2).toBe('999')
    const sVal3 = el.querySelector('#state').innerHTML
    expect(sVal3).toBe('3')
  })
});