import Head from "next/head";
import CheckAuth from "../../auth/CheckAuth";

const CreateProduct = () => {
    return (<CheckAuth>
        <div>
            <Head>
                <title>Create a new Expiry product / View Expiry products</title>
                <meta name="description" content="Create a new Expiry product / View Expiry products" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main_comp">
                <div className="logo">
                    <h1 className='bg-blue-500 p-1 text-lg text-white'>Expiry</h1>
                    <div className="container max-w-[1200px] m-auto">
                        <div className="products-add">
                            <h1>Add Products</h1>
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