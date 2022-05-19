import { useEffect, useState } from "react";
import { getUserProducts } from "../config/firebase";
import { Product } from "../interface/User";
import useUserContext from "../provider/userProvider";

const ProductList = () => {
    const { authUser } = useUserContext()
    const uid = authUser!.uid !== '' ? authUser!.uid : ''
    const [products, setProducts] = useState<Product[]>([])
    const getProducts = async () => {
        return await getUserProducts(uid)
    }
    useEffect(() => {
        getProducts().then(products => setProducts(products))
    }, [])
    return (
        <div className="w-full">
            <div className="w-full bg-white border">
                <div className="table_layout">
                    <div className="table_layout_header bg-gray-200 grid grid-cols-3 gap-4 p-2">
                        <div className="table_id">
                            <span className="text-gray-600 font-medium">ID</span>
                        </div>
                        <div className="table_name">
                            <span className="text-gray-600 font-medium">Name</span>
                        </div>
                        <div className="table_expires">
                            <span className="text-gray-600 font-medium">Expires</span>
                        </div>
                    </div>
                    <div className="table_layout_contents bg-white p-2">
                        {
                            products.map(product => {
                                return <div key={product.id} className="product_list_items  justify-between items-center grid grid-cols-3 gap-4">
                                            <div className="product_id_list">
                                                <p className="">{product.id}</p>
                                            </div>
                                            <div className="product_name_list">
                                                <p className="w-[80%] whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</p>
                                            </div>
                                            <div className="product_expires_list">
                                                <p className="">{product.expires}</p>
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