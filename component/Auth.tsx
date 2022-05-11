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
                    <input type="text" id="email" className="border border-gray-100" />
                    <input type="password" id="password"
                    className="border border-gray-100"
                    />
                    <button>Create account</button> 
                </div>
            </div>
        </div>
    )
}

export default Auth