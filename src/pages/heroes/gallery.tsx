import RootLayout from '../../layouts/root'
import { backendAPI } from '../../utils/api'
import { IHero } from '../../ds/hero'
import HeroCard from '../../components/HeroCard'
import Dialog from '../../components/NominateDialog'

export interface IResArr {
  size: number
  list: any[]
}


export interface HeroesGalleryProps {
  data: IHero[]
}

export const HeroesGallery = ({ data }: HeroesGalleryProps) => {
  // console.log({ data })
  return (
    <RootLayout>
      <div className={'w-full flex flex-wrap justify-around justify-items-center gap-4'}>
              {
        data.map((item) => (
          <HeroCard data={item} key={item.id}/>
        ))
      }
      </div>
    </RootLayout>
  )
}
export default HeroesGallery

export const getServerSideProps = async () => {
  const res = await backendAPI.get('/heroes/list')
  const data: IResArr = res.data
  return { props: { data: data.list } }
}
