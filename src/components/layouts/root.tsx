import Header from '../Header'
import NavBar from '../NavBar'
import { ReactNode } from 'react'

/**
 * 关于如何定义props，ref: /app-playground/app/layouts/layout.tsx
 */
export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'w-screen min-h-screen flex flex-col'}>
      <Header/>
      <NavBar/>
      <div className={'p-4 flex-grow flex justify-center items-center'}>
        {children}
      </div>
    </div>
  )
}

export default RootLayout
