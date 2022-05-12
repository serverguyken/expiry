import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../provider/userProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
}

export default MyApp
