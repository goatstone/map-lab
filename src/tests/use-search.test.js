import React, { useEffect } from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import useSearch from '../hooks/use-search'

Enzyme.configure({ adapter: new Adapter() })

describe('useSearch', () => {
  it('should be a function', () => {
    expect(typeof useSearch).toBe('function')
  })
  it('should return searchResulsts with correct information', () => {
    const initQuery = {
      query: '',
      radius: 50000,
      center: [0, 0],
      server: 'https://map-server-goatstone.appspot.com',
    }
    function TestComponent() {
      const [setQuery, searchResults] = useSearch(initQuery)
      useEffect(() => {
        setQuery({
          query: 'XXX',
          radius: 50000,
          center: [0, 0],
          server: 'MOCK_SERVER',
        })
      }, [])
      expect(typeof searchResults).toBe('object')
      return (<div>XXX</div>)
    }
    const el = mount(
      <TestComponent />,
    )
  })
})
