import { ShoppingCart, Star } from 'lucide-react'
import { useStore } from '../Context/ShopContext';
import toast from 'react-hot-toast';

function Item({ product }) {
    const { addToCart } = useStore();

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`${product.name} added to Cart`);
    }

    return (
        <div>
            {/* Image Container */}
            <div className="relative w-full h-48 flex justify-center items-center bg-gray-200 overflow-hidden">
                <p className="font-bold text-2xl">
                    {product.image}
                </p>
            <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2 py-1 rounded text-xs font-semibold">
                {product.category}
            </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                    ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating})</span>
            </div>

            {/* Price */}
            <div className="mb-3">
                <p className="text-2xl font-bold text-indigo-600">${product.price}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-4">
                {product.stock > 0 ? (
                    <span className="text-sm text-green-600 font-medium">
                        {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                    </span>
                ) : (
                    <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                )}
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition"
            >
                <ShoppingCart size={18} />
                Add to Cart
            </button>
        </div>
    </div>
)
}

export default Item
