import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useUserContext from '../provider/userProvider'

const Home: NextPage = () => {
  const { authUser } = useUserContext()
    const router = useRouter()
    if (authUser && authUser.isAuthenticated === null) {
        return (<></>)
    } else if (authUser && authUser.isAuthenticated === false) {
      router.push('/auth/login')
      return (<></>)
    } else {
      router.push('/product/create')
      return (<></>)
    }
}

export default Home