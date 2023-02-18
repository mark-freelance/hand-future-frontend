import type { NextPage } from 'next'
import NavBar from '../ui/components/NavBar'
import Header from '../ui/components/Header'
import RootLayout from '../ui/layouts/root'

const Home: NextPage = () => {
  return (
    <RootLayout>
      <div className={'text-6xl'}>
        todo: home page
      </div>
    </RootLayout>
  )
}

export default Home
