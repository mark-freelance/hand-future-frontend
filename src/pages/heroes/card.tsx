import { IHero, IShareCard } from '../../supports/ds/hero'
import BaseAvatar from '../../ui/base_components/BaseAvatar'
import { LoremIpsum, loremIpsum } from 'lorem-ipsum'
import InputText, { InputAction } from '../../ui/components/InputText'
import { ChangeEvent, useRef, useState } from 'react'
import InputTextArea from '../../ui/components/InputTextArea'
import backendAPI from '../../supports/utils/api'
import { COLOR_PRIMARY } from '../../config/theme'
import RootLayout from '../../ui/layouts/root'
import * as htmlToImage from 'html-to-image'
import { toast } from 'react-toastify'
import RenderShareCard from '../../ui/components/RenderShareCard'
import { Fonts } from '../../config/fonts'
import { FONT_WEIGHT, FONT_WEIGHTS } from '../../supports/ds/font'

const SAMPLE_HERO: IHero = {
  'id': '7dcbe16b-6f3e-491d-a6eb-6dd3929abe00',
  'avatar': 'https://gkleifeng.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9cd34eec-62ec-46d5-9cf9-6216cd8bc881%2F%25E9%25A9%25AC%25E5%25B2%25A9%25E6%259D%25BE.jpg?table=block&id=7dcbe16b-6f3e-491d-a6eb-6dd3929abe00&spaceId=5a775ac8-377b-4c22-918d-36dd67f5e3a2&width=600&userId=&cache=v2',
  'cities': '北京',
  'name': '马岩松',
  'title': '著名建筑师'
}

const SAMPLE_DATA: IShareCard = {
  ...SAMPLE_HERO,
  articleTitle: loremIpsum(),
  articleContent: new LoremIpsum({
    sentencesPerParagraph: {
      max: 3,
      min: 2
    },
    wordsPerSentence: {
      max: 10,
      min: 3
    }
  }).generateParagraphs(3)
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
  const [fontWeightTitle, setFontWeightTitle] = useState<FONT_WEIGHT>(FONT_WEIGHTS[8])
  const [fontWeightContent, setFontWeightContent] = useState<FONT_WEIGHT>(FONT_WEIGHTS[4])
  const [qrCodeUrl, setQrCodeUrl] = useState('https://gkleifeng.notion.site/da7ad92cb3414e6891c80e52541a6678')

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
      <div className={'flex flex-wrap justify-around max-w-[1600px] p-8 gap-8'}>

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
          <InputText type={'articleTitle'} placeholder={data.articleTitle} update={update}/>
          <InputTextArea rows={10} type={'articleContent'} placeholder={data.articleContent} update={update}/>

          {/* 二维码 */}
          <InputText label={'QR Code'} defaultValue={qrCodeUrl} update={({ value }) => {setQrCodeUrl(value)}}/>
        </div>

        <div className={'mt-20 mr-2'}>

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

          <div className="form-control mt-4 w-full">
            <label className={'input-group'}>
              <span className={'w-28'}>{'Title Weight'}</span>
              <select className="select select-bordered flex-grow"
                      defaultValue={fontWeightTitle}
                      onChange={(e) => setFontWeightTitle(e.target.value as unknown as FONT_WEIGHT)}>
                {FONT_WEIGHTS.map((weight) => (<option key={weight} value={weight}>{weight}</option>))}
              </select>
            </label>
          </div>

          <div className="form-control mt-4 w-full">
            <label className={'input-group'}>
              <span className={'w-28'}>{'Content Weight'}</span>
              <select className="select select-bordered flex-grow"
                      defaultValue={fontWeightContent}
                      onChange={(e) => setFontWeightContent(e.target.value as unknown as FONT_WEIGHT)}>
                {FONT_WEIGHTS.map((weight) => (<option key={weight} value={weight}>{weight}</option>))}
              </select>
            </label>
          </div>

          {/* 生成卡片 */}
          <button className={'btn btn-primary my-4'} onClick={onGenCard}>确认生成卡片</button>
        </div>

        {/* main wrapper */}
        <div>
          <RenderShareCard
            refCanvas={refCanvas}
            data={data}
            themeColor={themeColor}
            midColor={midColor}
            fontClass={Fonts[fontIndex].font?.className}
            fontWeightTitle={fontWeightTitle}
            fontWeightContent={fontWeightContent}
            qrCodeUrl={qrCodeUrl}
          />
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
