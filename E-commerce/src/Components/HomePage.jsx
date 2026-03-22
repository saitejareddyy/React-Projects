import Item from "./Item";
import { useStore } from "../Context/ShopContext";

function HomePage() {
    const { filteredProducts, selectedCategory, setSelectedCategory } = useStore();
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
                        <p className="text-gray-600">Discover our amazing collection of {filteredProducts.length} products</p>
                    </div>

                    <div>
                        {/* filter by category  */}
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm text-gray-700 cursor-pointer"
                        >
                            <option value="all">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home & garden">Home & Garden</option>
                            <option value="sports">Sports</option>
                            <option value="books">Books</option>
                            <option value="beauty">Beauty</option>
                            <option value="kitchen">Kitchen</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                            <Item product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage
