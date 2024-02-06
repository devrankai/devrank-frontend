import { ReactNode } from 'react'
import { NavBarApp } from '../../components/ui/navbar/NavBarApp'

type Props = {
  children: ReactNode
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <main>
      <NavBarApp children={children} />
    </main>
  )
}
