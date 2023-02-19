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
import { COLOR_PRIMARY } from '../../config/theme'
import RootLayout from '../../ui/layouts/root'
import * as htmlToImage from 'html-to-image'
import { toast } from 'react-toastify'
import RenderShareCard from '../../ui/components/RenderShareCard'
import { Fonts } from '../../config/fonts'
import { genPascalWithSpace } from '../../supports/utils/algo'


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


/**
 * 宽度为 360 px 固定
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Card = () => {

  const [data, setData] = useState<IShareCard>(SAMPLE_DATA)
  const [midColor, setMidColor] = useState('#337799')
  const [themeColor, setThemeColor] = useState(COLOR_PRIMARY)
  const refCanvas = useRef<HTMLDivElement>(null)
  const [fontIndex, setFontIndex] = useState(0)

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

  const onGenCard = async () => {
    if (data.avatar.includes('notion'))
      return toast.warning('默认头像仅做参考，请上传目标嘉宾头像！')

    const dataUrl = await htmlToImage.toPng(refCanvas.current!)
    console.log({ dataUrl })
    let a = document.createElement('a')
    a.href = dataUrl //Image Base64 Goes here
    a.download = `美丽中国·携手未来·${data.name}.png`
    a.click() //Downloaded file
  }

  return (
    <RootLayout>
      {/* 使用横向布局 */}
      <div className={'flex flex-wrap justify-center p-8'}>

        {/* 控制输入区域 */}
        <div className={'mt-20 mr-2'}>

          {/* todo: 添加一个搜索框，可以检索数据库中的人物
          但需要先将notion里的图都本地持久化才可以，否则html2image会无法使用 */}

          {/* 嘉宾头像 */}
          <label className={'flex items-center'}>
            <i>Click to upload a new avatar --{'>'}</i>
            <input type={'file'} className={'hidden'} accept={'images/*'} onChange={onAvatarChange}/>
            <BaseAvatar customClasses={'ml-5'} url={data.avatar} size={'md'}/>
          </label>

          {/* 嘉宾姓名、title */}
          <InputText type={'name'} maxLen={4} placeholder={data.name} update={update}/>
          <InputTextArea cols={10} rows={2} maxLength={30} type={'title'} placeholder={data.title} update={update}/>

          {/* 文字标题、内容 */}
          <InputText type={'topicTitle'} placeholder={data.topicTitle} update={update}/>
          <InputTextArea rows={10} type={'topicContent'} placeholder={data.topicContent} update={update}/>

          <div className={'divider'}/>

          {/* 控制主题色、过渡色 */}
          <InputText label={'Theme Color'} type={'color'} defaultValue={themeColor}
                     update={({ value }) => {setThemeColor(value)}}
          />
          <InputText label={'Mid Color'} type={'color'} defaultValue={midColor}
                     update={({ value }) => {setMidColor(value)}}
          />

          {/* 控制字体 */}
          <div className="form-control mt-4 w-full">
            <label className={'input-group'}>
              <span className={'w-28'}>{'Font'}</span>
              <select className="select select-bordered flex-grow"
                      onChange={(e) => setFontIndex(e.target.selectedIndex)}>
                {Fonts.map((fontItem, index) => (
                  <option key={index}>{fontItem.name}</option>
                ))}
              </select>
            </label>
          </div>

          {/* 生成卡片 */}
          <button className={'btn btn-primary my-4'} onClick={onGenCard}>确认生成卡片</button>
        </div>

        <div className={'divider divider-horizontal'}/>

        {/* main wrapper */}
        <div>
          <RenderShareCard refCanvas={refCanvas} themeColor={themeColor} midColor={midColor} data={data}
                           fontClass={Fonts[fontIndex].font?.className}/>
        </div>
      </div>
    </RootLayout>
  )
}

export default Card


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
