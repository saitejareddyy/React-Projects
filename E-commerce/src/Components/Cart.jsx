import { useStore } from '../Context/ShopContext'
import { Minus, Plus, Trash2 } from 'lucide-react';

function Cart() {
    const { getCartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useStore();

    const cartItems = getCartItems();
    console.log("updated cart items", cartItems)
    const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Shopping Cart</h2>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                        <p className="text-gray-500">Add some items to get started!</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.product.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-semibold text-gray-600">
                                            {item.product.image}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                                            <p className="text-sm text-gray-600">{item.product.category}</p>
                                            <div className="flex items-center mt-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="text-sm text-gray-600 ml-1">({item.product.rating})</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => decreaseQuantity(item.product.id)}
                                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQuantity(item.product.id)}
                                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-indigo-600">${(item.product.price * item.quantity).toFixed(2)}</p>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-500 hover:text-red-700 mt-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold text-gray-900">Total:</span>
                                <span className="text-2xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Cart
