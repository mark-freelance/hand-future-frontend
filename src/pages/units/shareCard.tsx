import { IHero } from '../../supports/ds/hero'
import BaseAvatar from '../../ui/base_components/BaseAvatar'
import { LoremIpsum, loremIpsum } from 'lorem-ipsum'

export interface IShareCard {
  hero: IHero
  topic: {
    title: string
    contents: string[]
  }
}

export interface genShareCardProps {
  hero: IHero
}

export const ShareCard = () => {

  const hero: IHero = {
    id: '277200be-c592-423a-bd20-e7c78a877a93',
    avatar: 'https://gkleifeng.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F31ac1753-a386-4012-8fc1-5932c0f84476%2F%25E9%2583%2591%25E6%2599%2593%25E7%25AC%259B.png?table=block&id=277200be-c592-423a-bd20-e7c78a877a93&spaceId=5a775ac8-377b-4c22-918d-36dd67f5e3a2&width=600&userId=&cache=v2',
    cities: '北京',
    name: '郑晓笛',
    title: '城市棕地与废弃地改造再生专家'
  }

  console.log('into comp: ', hero)

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 4,
      min: 2
    },
    wordsPerSentence: {
      max: 15,
      min: 4
    }
  })

  const data: IShareCard = {
    hero,
    topic: {
      title: loremIpsum(),
      contents: Array.from(Array(3)).map(() => lorem.generateParagraphs(1))
    }
  }
  console.log(data)

  return (
    <div className={'m-auto w-[360px] bg-primary p-4'}>

      <div className={'rounded-3xl bg-white p-4'}>

        {/* avatar | name - title */}
        <div className={'flex justify-around items-center'}>
          {/*  avatar */}
          <BaseAvatar
            customClasses={'m-4'}
            url={hero.avatar} name={hero.name} size={'lg'}/>

          {/*  name - title*/}
          <div className={'flex-1 flex flex-col justify-center items-center'}>
            <div className={'text-black text-3xl font-black'}>
              {hero.name}
            </div>

            <div className={'text-black'}>
              {hero.title}
            </div>
          </div>
        </div>

        {/*  topic title */}
        {/*<div className={'text-black text-2xl flex justify-center text-center'}>{data.topic.title}</div>*/}

        {/*  topic content */}
        <article className="prose">
          <h2 className={'text-center'}>{data.topic.title}</h2>

          {data.topic.contents.map((content, index) => (
            <p key={index}>{content}</p>
          ))}
        </article>

        {/*  携手的未来 */}
        <div className={'text-2xl text-primary text-center m-4 font-black'}>携手的未来</div>

      </div>

    </div>
  )
}

export default ShareCard


// export const getServerSideProps = async () => {
//   const res = await backendAPI.get('/heroes/list')
//   // console.log({ res })
//   const heroList: IHero[] = res.data.list
//   const index = Math.floor(Math.random() * heroList.length)
//   // console.log({ index })
//   const hero = heroList[index]
//   console.log('get from server: ', hero)
//   return { props: { hero } }
// }
