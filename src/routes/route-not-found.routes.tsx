import { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'

import { PageNotFound } from '../pages'

type Props = {
  children: ReactNode
}

export const RouteNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
