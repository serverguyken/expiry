const CreateProduct = () => {
    return (
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
    )
}

export default CreateProduct


export async function getServerSideProps(ctx: any) {
    return {
        props: {
            useAuth: true
        }, // will be passed to the page component as props
    }
}