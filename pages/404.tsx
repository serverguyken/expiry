import { NextPage } from "next"

const ErrorPage: NextPage = () => {
    return (
        <div className="max-w-lg m-auto w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="error_c_c">
                <h1>This page doesn’t exist. Try searching for something else.</h1>
            </div>
        </div>
    )
}

export default ErrorPage