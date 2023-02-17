import Header from '../components/Header'
import NavBar from '../components/NavBar'
import { ReactNode } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import backendAPI from '../utils/api'

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

      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT}/>

    </div>
  )
}

export default RootLayout
