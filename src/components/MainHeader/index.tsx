import React from 'react'
import { CommandBar, ICommandBarItemProps } from '@fluentui/react'

interface MainHeaderProps {
  title: string
  items: ICommandBarItemProps[]
  farItems: ICommandBarItemProps[]
}
interface IMainHeader {
  (props: MainHeaderProps): React.ReactElement
}

const MainHeader: IMainHeader = ({ title, items, farItems }: MainHeaderProps) => (
  <header>
    <h1>
      {title}
    </h1>
    <CommandBar
      items={items}
      farItems={farItems}
      ariaLabel="Use left and right arrow keys to navigate between commands"
    />
  </header>
)

export default MainHeader
