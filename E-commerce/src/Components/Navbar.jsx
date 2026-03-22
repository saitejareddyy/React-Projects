import { ShoppingCart, Search, User } from 'lucide-react'
import { useStore } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

function Navbar() {
    const { cartItems, searchQuery, setSearchQuery } = useStore()
    return (
        <nav className="hidden lg:block bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between gap-8">

                    {/* Logo */}
                    <Link to="/" className="shrink-0">
                        <h1 className="text-2xl font-bold text-indigo-600">ShopHub</h1>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Navigation Links & Icons */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">Home</Link>
                        <Link to="/cart" className="text-gray-700 hover:text-indigo-600 font-medium transition">Cart</Link>
                        <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition">About</Link>

                        {/* Icons */}
                        <button className="text-gray-700 hover:text-indigo-600 transition">
                            <User size={24} />
                        </button>
                        <button className="relative text-gray-700 hover:text-indigo-600 transition">
                            <ShoppingCart size={24} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {Object.keys(cartItems || {}).length}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
