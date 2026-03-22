import { createContext, useContext, useEffect, useState } from "react";
import { products } from '../db/data';

export const ShopContext = createContext({});

export const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const data = localStorage.getItem('data');
            const parsed = data ? JSON.parse(data) : {};
            return typeof parsed === 'object' && !Array.isArray(parsed) && parsed !== null ? parsed : {};
        } catch (e) {
            return {};
        }
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(cartItems));
    }, [cartItems])

    const addToCart = (product) => {
        setCartItems(prev => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1
        }));
    }

    const removeFromCart = (productId) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            delete newCart[productId];
            return newCart;
        });
    }

    const increaseQuantity = (productId) => {
        setCartItems(prev => ({
            ...prev,
            [productId]: prev[productId] + 1
        }));
    }

    const decreaseQuantity = (productId) => {
        setCartItems(prev => {
            if (prev[productId] > 1) {
                return { ...prev, [productId]: prev[productId] - 1 };
            } else {
                const newCart = { ...prev };
                delete newCart[productId];
                return newCart;
            }
        });
    }

    const getCartItems = () => {
        return Object.entries(cartItems).map(([id, quantity]) => {
            const product = getProductById(parseInt(id));
            if (!product) return null;
            return { product: { ...product }, quantity };
        }).filter(Boolean);
    }

    const getProductById = (id) => {
        return products.find(p => p.id === id);
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <ShopContext.Provider value={{
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            getCartItems,
            searchQuery,
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            filteredProducts
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export const useStore = () => {
    return (
        useContext(ShopContext)
    )
}