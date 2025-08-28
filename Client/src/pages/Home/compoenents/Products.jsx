import Product from '@/components/Product'
import { useAppStore } from '@/store/store'

const Products = ({ openProduct, handleOpenProduct, cardRefs }) => {
    const { products } = useAppStore()

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
                <Product
                    key={product._id || index}
                    product={product}
                    open={openProduct === product._id}
                    setOpen={handleOpenProduct}
                    index={index}
                    ref={cardRefs}
                />
            ))}
        </div>
    )
}

export default Products
