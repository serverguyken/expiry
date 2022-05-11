import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../config/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps['useAuth']) {
    const { useAuth } = pageProps
    const [isUser, setIsUser] = useState<null | boolean | any>(auth.currentUser)
    const router = useRouter()
    useEffect(() => {
      if (isUser) {
      } else if (isUser === null) {
        router.push('/')
      }
    }, [isUser])
  }
  return <Component {...pageProps} />
}

export default MyApp
