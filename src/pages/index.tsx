import type { NextPage } from 'next'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import RootLayout from '../layouts/root'

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
