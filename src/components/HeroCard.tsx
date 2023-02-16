import { IHero } from '../ds/hero'

/**
 * todo: use redux to alert working
 */
export const alertWorking = () => {

}

export interface HeroCardProps {
  data: IHero
}

export const HeroCard = ({ data }: HeroCardProps) => {
  return (
    <div className="card w-64 h-96 bg-base-100 image-full2">
      <figure ><img src={data.avatar} alt="Shoes"/></figure>
      <div className="card-body">
        <h2 className="card-title">
          {data.name}
          <div className="badge badge-outline">{data.cities}</div>
        </h2>
        <p>{data.title}</p>
        <div className="card-actions justify-end">
          <button className="badge badge-outline" onClick={alertWorking}>查看详情</button>
          <button className="badge badge-secondary" onClick={alertWorking}>我要提名</button>
        </div>
      </div>
    </div>
  )
}

export default HeroCard
