import Head from "next/head";
import { useState } from "react";
import CheckAuth from "../../auth/CheckAuth";
import { generateProdID } from "../../utils";

const CreateProduct = () => {
    const [productId, setProductID] = useState(generateProdID())
    const [productName, setProductName] = useState("")
    const [expiresMonth, setExpiresMonth] = useState("Jan")
    const [expiresDay, setExpiresDay] = useState("01")
    const [expiresYear, setExpiresYear] = useState("2022")
    
    return (<CheckAuth>
        <div>
            <Head>
                <title>Create a new Expiry product / View Expiry products</title>
                <meta name="description" content="Create a new Expiry product / View Expiry products" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main_comp">
                <div className="logo">
                    <h1 className='bg-blue-500 p-1 text-3xl text-white'>Expiry</h1>
                    <div className="main_container max-w-[1200px] m-auto">
                        <div className="products-add mt-4">
                            <h1 className="text-2xl font-semibold">Add Products</h1>
                            <div className="product_add-name mt-2">
                                <label htmlFor="product_name" className="block text-blue-500">Product Name</label>
                                <input type="text" id="product_name" className="" />
                            </div>
                            <div className="product_add-name">
                                <input type="text" placeholder="Name" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </CheckAuth>)
}

export default CreateProduct


export async function getServerSideProps(ctx: any) {
    return {
        props: {
            useAuth: true
        },
    }
}