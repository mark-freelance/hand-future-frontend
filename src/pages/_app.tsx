import '../../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import { updateToken } from '../utils/api'


function MyApp({ Component, pageProps }: AppProps) {
  updateToken()
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
