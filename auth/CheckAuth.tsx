import { useRouter } from "next/router"
import useUserContext from "../provider/userProvider"

const CheckAuth = ({ children }: {
    children: any
}) => {
    const { authUser } = useUserContext()
    const router = useRouter()
    if (authUser && authUser.isAuthenticated === null) {
        return (<></>)
    } else if (authUser && authUser.isAuthenticated === false) {
        router.push("/auth/login")
        return (<></>)
    } else {
        return (
            <>
                { children }
            </>
        )
    }
}

export default CheckAuth