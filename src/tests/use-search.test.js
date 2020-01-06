import React, { useState, useEffect } from 'react'
import { render, wait } from '@testing-library/react'
/*
  Test the state of a hook that has been updated with
  the useHooks function
*/
const expectedQuery = 'abc'
const expectedResults = [{ a: 2 }, { a: 2 }, {}]
function TC() {
  const [searchResults, setSearchResults] = useState([])
  const [query, setQuery] = useState('init query')
  useEffect(() => {
    //  Warning: An update to TC inside a test was not wrapped in act(...).
    // setTimeout(() => setSearchResults(arr), 1000)
    setSearchResults(expectedResults)
  }, [query])
  return (
    <div>
      DIVHOOK
      <div id="query">
        {query}
      </div>
      <div id="searchresults">
        {searchResults.length}
      </div>
      <button
        type="button"
        onClick={() => {
          setQuery(expectedQuery)
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
    expect(el.querySelector('#query').innerHTML)
      .toBe(expectedQuery)
    expect(el.querySelector('#searchresults').innerHTML)
      .toBe(String(expectedResults.length))
  })
})
