import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MainHeader from '../components/MainHeader'

Enzyme.configure({ adapter: new Adapter() })
const commandItems =
{
  main: [
    {
      key: 'a',
      text: 'Git',
      iconProps: { iconName: 'repo' },
      href: '',
    },
  ],
  far: [
    {
      key: 'b',
      text: 'B',
      // This needs an ariaLabel since it's icon-only
      ariaLabel: 'Info',
      iconOnly: true,
      iconProps: { iconName: 'Info' },
      onClick: () => true,
    },
  ]
}
describe('<MainHeader />', () => {
  it('should mount', () => {
    let wrapper
    act(() => {
      wrapper = shallow(
        <MainHeader
          title="X"
          commandItems={commandItems}
        />,
      )
    })
    expect(wrapper).toBeTruthy()
  })
})
