import axios from 'axios'

async function parseUrl() {
  const res = await axios.get('http://gkleifeng.com:3001/files/e28f823e-b064-11ed-aafd-5783702bc47d_%E5%91%A8%E6%A6%95.png')
  console.log(res.data)
}

parseUrl()
