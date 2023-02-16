import Header from '../Header'
import NavBar from '../NavBar'
import { ReactNode } from 'react'

/**
 * 关于如何定义props，ref: /app-playground/app/layouts/layout.tsx
 */
export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header/>
      <NavBar/>
      {
        children
      }
    </div>
  )
}

export default RootLayout
