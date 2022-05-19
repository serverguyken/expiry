import Head from "next/head";
import { useEffect, useState } from "react";
import CheckAuth from "../../auth/CheckAuth";
import ProductList from "../../components/ProductList";
import { generateProdID } from "../../utils";

const CreateProduct = () => {
    const productId = generateProdID()
    const [productName, setProductName] = useState("")
    const [expireMonth, setExpireMonth] = useState("Jan")
    const [expireDay, setExpireDay] = useState("01")
    const [expireYear, setExpireYear] = useState("2022")

    const addProduct = () => {
        console.log('added');
        
    }
    return (<CheckAuth>
        <div>
            <Head>
                <title>Create a new Expiry product / View Expiry products</title>
                <meta name="description" content="Create a new Expiry product / View Expiry products" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="logo">
                <h1 className='bg-blue-500 pt-3 pb-3 pl-4 text-3xl text-white'>Expiry</h1>
            </div>
            <main className="main_comp main_container max-w-[1200px] m-auto">
                <div className="product_add_section">
                    <div className="products-add mt-4 max-w-sm">
                        <h1 className="text-2xl font-semibold">Add Products</h1>
                        <div className="product_add-options mt-5">
                            <div className="product_id_input mb-3">
                                <label htmlFor="product_name" className="block text-gray-500">Product ID</label>
                                <input type="text" disabled id="product_name" className="cursor-not-allowed bg-gray-200 outline-none focus:bg-gray-300 focus:bg-opacity-80 focus:transition-all rounded p-2 w-full font-medium mt-1" value={productId} />
                            </div>
                            <div className="product_name_input mb-3">
                                <label htmlFor="product_name" className="block text-gray-500">Product Name</label>
                                <input type="text" id="product_name" className="bg-gray-200 outline-none focus:bg-gray-300 focus:bg-opacity-80 focus:transition-all rounded p-2 w-full font-medium mt-1"
                                    onChange={(e: any) => {
                                        setProductName(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="product_exp_select mb-3">
                                <div className="flex justify-between items-center space-x-3">
                                    <div className="product_exp_month w-full">
                                        <label className="block text-gray-500">Exp Month</label>
                                        <select className="bg-gray-200 outline-none focus:bg-gray-300 focus:bg-opacity-80 focus:transition-all rounded p-2 w-full font-medium mt-1"
                                            onChange={(e: any) => {
                                                setExpireMonth(e.target.value)
                                            }}
                                        >
                                            <option value="1">
                                                1
                                            </option>
                                            <option value="2">
                                                2
                                            </option>
                                            <option value="3">
                                                3
                                            </option>
                                            <option value="4">
                                                4
                                            </option>
                                            <option value="5">
                                                5
                                            </option>
                                            <option value="6">
                                                6
                                            </option>
                                            <option value="7">
                                                7
                                            </option>
                                            <option value="8">
                                                8
                                            </option>
                                            <option value="9">
                                                9
                                            </option>
                                            <option value="10">
                                                10
                                            </option>
                                            <option value="11">
                                                11
                                            </option>
                                            <option value="12">
                                                12
                                            </option>
                                        </select>
                                    </div>
                                    <div className="product_exp_day w-full">
                                        <label className="block text-gray-500">Exp Day</label>
                                        <select className="bg-gray-200 outline-none focus:bg-gray-300 focus:bg-opacity-80 focus:transition-all rounded p-2 w-full font-medium mt-1"
                                            onChange={(e: any) => {
                                                setExpireDay(e.target.value)
                                            }}
                                        >
                                            <option value="1">
                                                1
                                            </option>
                                            <option value="2">
                                                2
                                            </option>
                                            <option value="3">
                                                3
                                            </option>
                                            <option value="4">
                                                4
                                            </option>
                                            <option value="5">
                                                5
                                            </option>
                                            <option value="6">
                                                6
                                            </option>
                                            <option value="7">
                                                7
                                            </option>
                                            <option value="8">
                                                8
                                            </option>
                                            <option value="9">
                                                9
                                            </option>
                                            <option value="10">
                                                10
                                            </option>
                                            <option value="11">
                                                11
                                            </option>
                                            <option value="12">
                                                12
                                            </option>
                                            <option value="13">
                                                13
                                            </option>
                                            <option value="14">
                                                14
                                            </option>
                                            <option value="15">
                                                15
                                            </option>
                                            <option value="16">
                                                16
                                            </option>
                                            <option value="17">
                                                17
                                            </option>
                                            <option value="18">
                                                18
                                            </option>
                                            <option value="19">
                                                19
                                            </option>
                                            <option value="20">
                                                20
                                            </option>
                                            <option value="21">
                                                21
                                            </option>
                                            <option value="22">
                                                22
                                            </option>
                                            <option value="23">
                                                23
                                            </option>
                                            <option value="24">
                                                24
                                            </option>
                                            <option value="25">
                                                25
                                            </option>
                                            <option value="26">
                                                26
                                            </option>
                                            <option value="27">
                                                27
                                            </option>
                                            <option value="28">
                                                28
                                            </option>
                                            <option value="29">
                                                29
                                            </option>
                                            <option value="30">
                                                30
                                            </option>
                                            <option value="31">
                                                31
                                            </option>




                                        </select>
                                    </div>
                                    <div className="product_exp_year w-full">
                                        <label className="block text-gray-500">Exp Year</label>
                                        <input type="number" id="product_name" className="bg-gray-200 outline-none focus:bg-gray-300 focus:bg-opacity-80 focus:transition-all rounded p-2 w-full font-medium mt-1 appearance-none"
                                            onChange={(e: any) => {
                                                setExpireYear(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product_add_btn mt-8">
                            <button className="bg-blue-500 text-white w-full text-center font-medium rounded p-2 outline-none hover:bg-opacity-90 hover:transition-all"
                            onClick={() => addProduct}
                            >Add</button>
                        </div>
                    </div>
                </div>
                <div className="producs_list_section w-full mt-5">
                    <ProductList />
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