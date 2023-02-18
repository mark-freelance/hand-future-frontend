import { IHero } from '../../supports/ds/hero'
import BaseAvatar from '../../ui/base_components/BaseAvatar'
import { LoremIpsum, loremIpsum } from 'lorem-ipsum'
import { QRCodeSVG } from 'qrcode.react'
import Image from 'next/image'
import InputText, { InputAction } from '../../ui/components/InputText'
import { ChangeEvent, useRef, useState } from 'react'
import InputTextArea from '../../ui/components/InputTextArea'
import backendAPI from '../../supports/utils/api'
import clsx from 'clsx'
import { COLOR_PRIMARY } from '../../supports/config/theme'
import { toPng } from 'html-to-image'
import { toast } from 'react-toastify'
import RootLayout from '../../ui/layouts/root'


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
  const [midColor, setMidColor] = useState('#337799')
  const [themeColor, setThemeColor] = useState(COLOR_PRIMARY)
  const refCanvas = useRef<HTMLDivElement>(null)
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

  const onGenCard = () => {
    toast.warning('下载功能仍有暂无法解决的问题，请先尝试截图保存！', { position: toast.POSITION.BOTTOM_RIGHT })
    // toPng(refCanvas.current!, { cacheBust: true, })
    //   .then((dataUrl) => {
    //     const link = document.createElement('a')
    //     link.download = 'my-image-name.png'
    //     link.href = dataUrl
    //     link.click()
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    // const dataUrl = await htmlToImage.toPng(refCanvas.current!)
    // console.log({ dataUrl })
    // let a = document.createElement('a') //Create <a>
    // a.href = dataUrl //Image Base64 Goes here
    // a.download = `美丽中国·携手未来·${data.name}.png` //File name Here
    // a.click() //Downloaded file
  }

  return (
    <RootLayout>
      <div className={'flex justify-center p-8'}>
        <div className={'mt-20 mr-2'}>


          <label className={'flex items-center'}>
            <i>Click to upload a new avatar --{'>'}</i>
            <input type={'file'} className={'hidden'} accept={'images/*'} onChange={onAvatarChange}/>
            <BaseAvatar customClasses={'ml-5'} url={data.avatar} size={'md'}/>
          </label>

          <InputText type={'name'} placeholder={data.name} update={update}/>
          <InputText type={'title'} placeholder={data.title} update={update}/>
          <InputText type={'topicTitle'} placeholder={data.topicTitle} update={update}/>
          <InputTextArea type={'topicContent'} placeholder={data.topicContent} update={update}/>

          <div className={'divider'}/>

          <InputText label={'Theme Color'} type={'color'} defaultValue={themeColor}
                     update={({ value }) => {setThemeColor(value)}}
          />
          <InputText label={'Mid Color'} type={'color'} defaultValue={midColor}
                     update={({ value }) => {setMidColor(value)}}
          />

          <button className={'btn btn-primary my-4'} onClick={onGenCard}>确认生成卡片</button>
        </div>

        <div className={'divider divider-horizontal'}/>

        {/* main wrapper */}
        <div>
          {/* main*/}
          <div ref={refCanvas} className={clsx(`w-[360px] p-4 relative`)}
               style={{ background: `linear-gradient(to bottom, ${themeColor}, ${midColor}, ${themeColor})` }}
          >
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

              {/*<Image src={'/card/资源 5.svg'} alt={'大手'} width={300} height={240} color={themeColor}*/}
              {/*       className={`absolute left-0 bottom-44 w-full`}*/}

              {/*/>*/}

              {/* raw color: #11a278 */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1264.52 501.36" width={300} height={240}
                   className={`absolute left-0 bottom-32 w-full`}>
                <defs>
                  <style>{
                    `.cls-1,.cls-2{fill:none;}
                  .cls-1{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:17px;}
                  .cls-2{stroke:${themeColor};stroke-miterlimit:10;stroke-width:16px;}`
                  }</style>
                </defs>
                <title>资源 5</title>
                <g id="图层_2" data-name="图层 2">
                  <g id="图层_3" data-name="图层 3">
                    <path className="cls-1 "
                          d="M707.74,317.16c-5.74-7.43-5.81-8-7.65-11.85-8.73-18.11-7.78-57-9.69-76.54-.76-7.8,0-15.71-2.23-23.42-3.69-13-17.19-17.69-27.57-9.52-9.2,7.24-13.54,16.32-14.6,28.16-1.58,17.73-.56,58.34,1.66,75.65,1.57,12.15-1,23.93.09,35.94,1.25,13.55-1.24,27.31,2.36,40.82,6.13,23,22,35.64,43.93,41.43,26.82,7.08,54.22,7.35,81.84,7.72,24.71.33,93.51,7,103.1,8.07,26.61,3.08,53.17,6.58,79.77,9.77,2.39.28,262.63,44.22,295.53,49.47"/>
                    <path className="cls-1 "
                          d="M1256,321.06c-17.47,1.14-419.8.1-448.2-2.19-13.53-1.09-21.82-7.67-25.73-19.4-14-41.87-28.77-83.6-36.42-127.24A268.72,268.72,0,0,1,742,117.81c.53-17.75-.09-71-.74-88.76-.37-10.4-10.19-20.33-19.86-20.54-13.16-.29-23.32,6.73-26.36,18.56-.49,1.9-.9,3.82-1.34,5.72"/>
                    <path className="cls-1 "
                          d="M667.75,190.51c-.54-1.65-1.78-3.42-1.52-4.93,6-35-3-82.61,1-117.66,1.32-11.72,5.25-22,15.4-29.06,11.72-8.13,25-2.89,28.24,11.52A41.6,41.6,0,0,1,711.94,64c-4.14,36.83-.14,108.53,8.14,144.41a84.62,84.62,0,0,1,1.79,8.94"/>
                    <path className="cls-1 "
                          d="M576.16,317.16c5.73-7.43,5.81-8,7.65-11.85,8.73-18.11,7.77-57,9.68-76.54.77-7.8,0-15.71,2.23-23.42,3.7-13,17.19-17.69,27.58-9.52,9.19,7.24,13.54,16.32,14.59,28.16,1.59,17.73.56,58.34-1.66,75.65-1.56,12.15,1,23.93-.09,35.94-1.24,13.55,1.24,27.31-2.36,40.82-6.12,23-21.95,35.64-43.92,41.43-26.82,7.08-54.22,7.35-81.85,7.72-24.71.33-93.5,7-103.09,8.07-26.61,3.08-53.18,6.58-79.78,9.77-2.38.28-229.21,27.87-316.64,49.47"/>
                    <path className="cls-1"
                          d="M8.5,321.06c17.47,1.14,439.18.1,467.58-2.19,13.53-1.09,21.81-7.67,25.73-19.4,14-41.87,28.77-83.6,36.42-127.24a268.71,268.71,0,0,0,3.66-54.42c-.52-17.75.1-71,.74-88.76C543,18.65,552.82,8.72,562.5,8.51c13.16-.29,23.31,6.73,26.36,18.56.49,1.9.89,3.82,1.34,5.72"/>
                    <path className="cls-1 "
                          d="M616.15,190.51c.54-1.65,1.78-3.42,1.52-4.93-6-35,3-82.61-1-117.66-1.33-11.72-5.25-22-15.41-29.06C589.52,30.73,576.3,36,573,50.38A41.6,41.6,0,0,0,572,64c4.13,36.83.13,108.53-8.14,144.41a82.16,82.16,0,0,0-1.79,8.94"/>
                    <path className="cls-2 "
                          d="M370.4,139.56l-.37-2.73c-8.33-56,30.68-105.41,86.68-113.74l1.08-.16"/>
                    <path className="cls-2" d="M444.49,134.27h0a61.73,61.73,0,0,1,19.4-85.12l.56-.35"/>
                    <path className="cls-2" d="M839.5,209h0a46.58,46.58,0,0,1,.78,65.86l-.35.36"/>
                    <path className="cls-2" d="M894.26,190.33h0a77.34,77.34,0,0,1-31.42,104.76l-.72.39"/>
                  </g>
                </g>
              </svg>

              <div className={'h-[140px]'}/>
              <div className={'text-2xl text-center m-2 font-black'} style={{ color: themeColor }}>携手的未来</div>

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
    </RootLayout>
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
