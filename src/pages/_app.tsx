import '../../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { updateToken } from '../../supports/utils/api'
import { Provider } from 'react-redux'
import { store } from '../../supports/store/store'


function MyApp({ Component, pageProps }: AppProps) {
  updateToken()
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
