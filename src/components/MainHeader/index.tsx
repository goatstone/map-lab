import React from 'react'
import { CommandBar, Slider, ICommandBarItemProps } from '@fluentui/react'

interface MainHeaderProps {
  title: string
  items: ICommandBarItemProps[]
  farItems: ICommandBarItemProps[]
  children: React.ReactElement
}
interface IMainHeader {
  (props: MainHeaderProps): React.ReactElement
}

const MainHeader: IMainHeader = ({
  title, items, farItems, children,
}: MainHeaderProps) => (
  <header>
    <h1>
      {title}
    </h1>
    <CommandBar
      items={items}
      farItems={farItems}
      ariaLabel="Use left and right arrow keys to navigate between commands"
    >
      <Slider />
    </CommandBar>
    {children}
  </header>
)

export default MainHeader
