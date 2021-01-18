import React from 'react'
import { CommandBar, ICommandBarItemProps } from '@fluentui/react'

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
    {children}
    <CommandBar
      items={items}
      farItems={farItems}
      ariaLabel="Use left and right arrow keys to navigate between commands"
    />
  </header>
)

export default MainHeader
