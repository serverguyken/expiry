import { useEffect, useState } from "react"
import { auth } from "../config/firebase"

export const handleAuth = () => {
    const [isUser, setIsUser] = useState<null | boolean>(null)
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
        return <main className="main_comp">
            <div className="logo">
                <h1 className='bg-blue-500 p-1 text-lg text-white'>Expiry</h1>
                <div className="container max-w-[1200px] m-auto">
                    <div className="products-add">
                        <h1>Add Products</h1>
                    </div>
                </div>
            </div>
        </main>
    }
    else if (isUser === null) {
        return (
            <div>Loading....</div>
        )
    }
    return <div>
        <Auth />
    </div>
}


const Auth = () => {
    return (
        <Signup />
    )
}


const Signup = () => {
    return (
        <div className="sign_up max-w-lg m-auto">
            <div className="signup_header">
                <h1>Sign Up for Expiry</h1>
                <p>Create your expiry account today!</p>
                <div className="form">
                    <input type="text" id="email" className="border-gray-100" />
                    <input type="password" id="password" />
                </div>
            </div>
        </div>
    )
}