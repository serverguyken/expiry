import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { snapshot } from "valtio";
import { createCollectionRef, deleteUserProduct, getUserProducts } from "../config/firebase";
import { Product } from "../interface/User";
import useUserContext from "../provider/userProvider";
import store from "../store";
import { isBrowser, setClass } from "../utils";

const ProductList = () => {
    const { authUser } = useUserContext()
    const uid = authUser!.uid !== '' ? authUser!.uid : ''
    const [products, setProducts] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showFilterOptions, setShowFilterOptions] = useState(false)
    const [filterOption, setFilterOption] = useState('name')
    useEffect(() => {
        const ref = createCollectionRef(`users/${uid}/products`)
        const unsubscribe = onSnapshot(ref, snapshot => {
            setProducts(snapshot.docs.map((docs: any) => docs.data()))
        })
        return () => { unsubscribe() }
    }, [])

    const searchProduct = (term: string) => {
         return products.filter((product: any) => {
            return product[filterOption].toLocaleLowerCase().includes(term.toLowerCase())  || product[filterOption].toLocaleLowerCase().includes(term.toLowerCase())
        })
    }

    const deleteProduct = (id: string) => {
        if (isBrowser()) {
            const productListElement = document.querySelector('.product_list_items')
            productListElement?.classList.remove('animate-reveal')
            productListElement?.classList.add('animate-exit_reveal')
        }
        setTimeout(() => {
            deleteUserProduct(uid, id)
        }, 180)
    }
    
    
    useEffect(() => {
        if (showFilterOptions) {
            if (isBrowser()) {
                document.querySelector('.filter_select')?.classList.remove('border-gray-200')
                document.querySelector('.filter_select')?.classList.add('border-blue-500')
            }
        } else {
            if (isBrowser()) {
                document.querySelector('.filter_select')?.classList.add('border-gray-200')
                document.querySelector('.filter_select')?.classList.remove('border-blue-500')
            } 
        }
    }, [showFilterOptions])
    return (
        <div className="w-full mb-10">
            <div className="search_product_list  max-w-sm mt-3 mb-3 flex items-center space-x-3">
                <div className="search_box">
                    <input type="text" placeholder="Search for product" className="border boder-gray-200 p-2 w-full rounded outline-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onChange={(e: any) => {
                            setSearchTerm(e.target.value)
                        }}
                    />
                </div>
                <div className="search_filter relative inline-block cursor-pointer"
                >
                    <div className="filter_select border border-gray-200 p-2 w-auto flex items-center space-x-2 select-none" 
                    onClick={() => {
                        setShowFilterOptions(!showFilterOptions)
                    }}>
                        <p className={setClass(!showFilterOptions ? "text-gray-500": "text-blue-500")}>Filter</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className={setClass("h-5 w-5 rotate-90",!showFilterOptions ? "text-gray-500": "text-blue-500")} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                    </div>
                    {
                        showFilterOptions &&
                        <div className="filter_options absolute pt-2 z-50 max-w-[12rem]">
                            <div className="filter_select_options bg-white border border-gray-200 rounded shadow-sm w-full p-2 ">
                                <div className="flex items-center space-x-2 mt-2 mb-2">
                                    <div className={setClass("select_option_name w-5 h-5", filterOption === 'name' ? 'bg-blue-500' : 'ring-1 ring-blue-500')}
                                        onClick={() => {
                                            if (filterOption === 'name') {
                                                setFilterOption('')
                                            } else {
                                                setFilterOption('name')
                                            }
                                        }}
                                    >
                                        {
                                            filterOption === 'name' && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        }

                                    </div>
                                    <p>Name</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-2 mb-2">
                                    <div className={setClass("select_option_id w-5 h-5", filterOption === 'id' ? 'bg-blue-500' : 'ring-1 ring-blue-500')}
                                        onClick={() => {
                                            if (filterOption === 'id') {
                                                setFilterOption('')
                                            } else {
                                                setFilterOption('id')
                                            }
                                        }}
                                    >
                                        {
                                            filterOption === 'id' && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        }

                                    </div>
                                    <p>Id</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="w-full bg-white border">
                <div className="table_layout">
                    <div className="table_layout_header bg-gray-200 grid grid-cols-4 gap-4 p-2">
                        <div className="table_id">
                            <span className="text-gray-600 font-medium">ID</span>
                        </div>
                        <div className="table_name">
                            <span className="text-gray-600 font-medium">Name</span>
                        </div>
                        <div className="table_expires">
                            <span className="text-gray-600 font-medium">Expires</span>
                        </div>
                        <div className="table_expires">
                            <span className="text-gray-600 font-medium"></span>
                        </div>
                    </div>
                    <div className="table_layout_contents bg-white pt-2 pl-2 pr-2">
                        {
                            searchProduct(searchTerm).length === 0 ?
                                <p className="text-center mt-4 mb-4">No expiry product</p>
                                :
                                searchProduct(searchTerm).map(product => {
                                    return <div key={product.id} className="product_list_items  justify-between items-center grid grid-cols-4 gap-3 animate-reveal pt-2 pb-2">
                                        <div className="product_id_list">
                                            <p className="text-gray-700">{product.id}</p>
                                        </div>
                                        <div className="product_name_list">
                                            <p className="text-gray-700 w-[80%] whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</p>
                                        </div>
                                        <div className="product_expires_list">
                                            <p className="text-gray-700">{product.expires}</p>
                                        </div>
                                        <div className="product_delete_list cursor-pointer ml-6"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList