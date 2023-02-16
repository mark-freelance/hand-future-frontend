import RootLayout from '../../components/layouts/root'
import { backendAPI } from '../../utils/api'

export interface IResArr {
  size: number
  list: any[]
}

export interface IHero {
  id: string
  name: string
  title: string
  cities: string
  avatar: string
}

export interface HeroesGalleryProps {
  data: IHero[]
}

export const HeroesGallery = ({ data }: HeroesGalleryProps) => {
  console.log({data})
  return (
    <RootLayout>
      {
        data.map((item) => (
          <div key={item.id}>
            {item.name}
          </div>
        ))
      }
    </RootLayout>
  )
}
export default HeroesGallery

export const getServerSideProps = async () => {
  const res = await backendAPI.get('/heroes/list')
  const data: IResArr = res.data
  return { props: { data: data.list } }
}
