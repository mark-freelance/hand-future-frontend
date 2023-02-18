import { IHero } from '../../supports/ds/hero'
import BaseAvatar from '../../ui/base_components/BaseAvatar'
import { LoremIpsum, loremIpsum } from 'lorem-ipsum'
import { QRCodeSVG } from 'qrcode.react'
import Image from 'next/image'
import InputText, { InputAction } from '../../ui/components/InputText'
import { ChangeEvent, useState } from 'react'
import InputTextArea from '../../ui/components/InputTextArea'
import backendAPI from '../../supports/utils/api'

export interface IShareCard extends IHero {
  topicTitle: string
  topicContent: string
}

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


const SAMPLE_DATA: IShareCard = {
  ...{
    id: '277200be-c592-423a-bd20-e7c78a877a93',
    avatar: 'https://gkleifeng.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F31ac1753-a386-4012-8fc1-5932c0f84476%2F%25E9%2583%2591%25E6%2599%2593%25E7%25AC%259B.png?table=block&id=277200be-c592-423a-bd20-e7c78a877a93&spaceId=5a775ac8-377b-4c22-918d-36dd67f5e3a2&width=600&userId=&cache=v2',
    cities: '北京',
    name: '郑晓笛',
    title: '城市棕地与废弃地改造再生专家'
  },
  topicTitle: loremIpsum(),
  topicContent: lorem.generateParagraphs(3)
}

export const ShareCard = () => {
  const W = 360

  const [data, setData] = useState<IShareCard>(SAMPLE_DATA)
  console.log(data)


  const update = ({ type, value }: InputAction) => {
    setData({ ...data, [type]: value })
  }

  const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    const resUploadAvatar = await backendAPI.post('/files/upload', formData)
    console.log({ resUploadAvatar })
    const avatar = resUploadAvatar.data.data as string
    setData({ ...data, avatar })
  }

  return (
    <div className={'flex justify-center p-8'}>
      <div className={'mt-20 mr-2'}>

        <label>
          <input type={'file'} className={'hidden'} accept={'images/*'} onChange={onAvatarChange}/>
          <BaseAvatar customClasses={'ml-5'} url={data.avatar} size={'md'}/>
        </label>

        <InputText type={'name'} placeholder={data.name} update={update}/>
        <InputText type={'title'} placeholder={data.title} update={update}/>
        <InputText type={'topicTitle'} placeholder={data.topicTitle} update={update}/>
        <InputTextArea type={'topicContent'} placeholder={data.topicContent} update={update}/>

        <div className={'divider'}/>
        <button className={'btn btn-primary'}>下载</button>
      </div>

      <div className={'divider divider-horizontal'}/>

      {/* main wrapper */}
      <div>
        {/* main*/}
        <div className={`w-[360px] p-4 relative bg-gradient-to-b from-primary via-red-300 to-primary `}>

          <div className={'rounded-3xl bg-white p-4'}>

            {/* avatar | name - title */}
            <div className={'flex justify-around items-center'}>
              {/*  avatar */}
              <BaseAvatar
                customClasses={'m-4'}
                url={data.avatar} name={data.name} size={'lg'}/>

              {/*  name - title*/}
              <div className={'flex-1 flex flex-col justify-center items-baseline'}>
                <div className={'text-black text-3xl font-black flex items-center'}>
                  {/*2.10 小手图形-03.svg*/}
                  <Image priority src={'/card/2.10 小手图形-03.svg'} alt={'small_hand_03.svg'} width={40} height={40}
                         className={'-translate-y-1'}/>
                  <p>{data.name}</p>
                </div>

                <div className={'text-black'}>
                  {data.title}
                </div>
              </div>
            </div>

            {/*  topic title */}
            {/*<div className={'text-black text-2xl flex justify-center text-center'}>{data.topic.title}</div>*/}

            {/*  topic content */}
            <article className="prose">
              <h2 className={'text-center'}>{data.topicTitle}</h2>

              {data.topicContent.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>

            <Image src={'/card/资源 5.svg'} alt={'大手'} width={300} height={240}
                   className={`absolute left-0 bottom-44 w-full`}/>

            {/*  携手的未来 */}
            <div className={'h-[140px]'}/>
            <div className={'text-2xl text-primary text-center m-2 font-black'}>携手的未来</div>

            <QRCodeSVG value="https://gkleifeng.notion.site/da7ad92cb3414e6891c80e52541a6678"
                       className={'mx-auto my-2'}
                       width={'64px'} height={'64px'}/>

            <div className={'text-black text-center text-sm text-gray-500'}>
              <p>扫码查看活动介绍</p>
              <p>欢迎您们的加入</p>
            </div>
          </div>

        </div>
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
