import { useEffect, useState } from "react"
import { setErrorCodeMessage, signUpUser } from "../../config";
import { setClass, validate } from "../../utils"
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState("")
    const [password, setPassword] = useState("")
    const [passwordValid, setPasswordValid] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (email === "") {
            setEmailValid(false)
        } else {
            setEmailValid(true)
            const { message, hasError } = validate('email', email)
            hasError ? setEmailErrorMessage(message) : setEmailErrorMessage("")
            hasError ? setEmailValid(false) : setEmailValid(true)
            hasError ? setEmailError(true) : setEmailError(false)
        }
    }, [email])

    useEffect(() => {
        if (password === "") {
            setPasswordValid(false)
        } else {
            setPasswordValid(true)
            const { message, hasError } = validate('password', password)
            hasError ? setPasswordErrorMessage(message) : setPasswordErrorMessage("")
            hasError ? setPasswordValid(false) : setPasswordValid(true)
            hasError ? setPasswordError(true) : setPasswordError(false)
        }
    }, [password])

    const handleSignUp = () => {
        if (!emailValid && !passwordValid) setErrorMessage("Please fill all required fields")
        else setErrorMessage("")
        if (!emailValid || !passwordValid) {
            if (!emailValid) {
                setEmailError(true)
                setEmailErrorMessage("Please enter an email address")
            }
            if (!passwordValid) {
                setPasswordError(true)
                setPasswordErrorMessage("Please enter a password")
            }
        } else {
            setErrorMessage("")
            const data = {
                email,
                password,
                prodsID: uuidv4()
            }
            signUpUser(data, (userData: any) => {
                setLoading(true)
                setTimeout(() => {
                    router.push('/product/create')
                }, 4000)
                setTimeout(() => {
                    setLoading(false)
                }, 5000)
            }, (error: any) => {
                setErrorMessage(setErrorCodeMessage(error?.code).message)
            })
        }
    }


    return (
        <div className="sign_up main_container max-w-lg m-auto w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="sign_up_header mt-5">
                <h1 className="text-2xl font-semibold">Sign Up for Expiry</h1>
                <p className='mt-1'>Create your expiry account today!</p>
                <div className="form mt-5">
                    <div className="form_inputs mb-4">
                        <div className="block email_input mb-2">
                            <input type="text" id="email"
                                onChange={(e: any) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={setClass("placeholder-gray-500 p-2 w-full max-w-md rounded select-none appearance-none", !emailError ? "border-none ring-1 ring-gray-200 focus:outline-none focus:border-none focus:ring-1 focus:ring-blue-500" : "border-none ring-1 ring-red-500 focus:outline-none focus:border-none focus:ring-1 focus:ring-red-500")} />
                            <p className="text-red-300 text-sm mt-1">
                                {emailErrorMessage}
                            </p>
                        </div>
                        <div className="block password_input">
                            <input type="password" id="password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={setClass("placeholder-gray-500 p-2 w-full max-w-md rounded select-none appearance-none", !passwordError ? "border-none ring-1 ring-gray-200 focus:outline-none focus:border-none focus:ring-1 focus:ring-blue-500" : "border-none ring-1 ring-red-500 focus:outline-none focus:border-none focus:ring-1 focus:ring-red-500")} />
                            <p className="text-red-300 text-sm mt-1">
                                {passwordErrorMessage}
                            </p>
                        </div>
                    </div>
                    {
                        !loading ?
                            < button
                                onClick={handleSignUp}
                                className="bg-blue-500 text-white rounded p-2 w-full max-w-md hover:bg-opacity-90">Create account</button>
                            :
                            <button
                                className="bg-blue-500 text-white rounded p-2 w-full max-w-md hover:bg-opacity-90">Loading....</button>
                    }
                </div>
                <div className="signup_error mt-1">
                    <p className="text-red-500 text-sm">
                        {errorMessage}
                    </p>
                </div>
                <div className="no_account mt-2">
                    <p>Already have an account? <span><Link href="/auth/login">
                        <a className="text-blue-500 underline">Log In</a>
                    </Link></span></p>
                </div>
            </div>
        </div >
    )
}
export default SignUp