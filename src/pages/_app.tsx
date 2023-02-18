import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../../supports/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


function MyApp({ Component, pageProps }: AppProps) {
  console.log('store: ', store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)} loading={null}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
