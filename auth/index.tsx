import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Auth from "../component/Auth"
import { auth } from "../config/firebase"

export const handleAuth = () => {
    const [isUser, setIsUser] = useState<null | boolean>(null)
    const router = useRouter()
    const setUser = () => {
        const isUser = auth.currentUser
        if (isUser) {
            setIsUser(true)
        } else if (isUser === null) {
            setIsUser(false)
        }
    }
    useEffect(() => {
        setUser()
    }, [])
    if (isUser) {
        router.push('/product/create')
        return (
            <></>
        )
    }
    else if (isUser === null) {
        return (
            <div>Loading....</div>
        )
    }
    return <Auth />
}


