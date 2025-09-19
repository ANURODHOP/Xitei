import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogOutButton from '../Utilites/LogOutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext'; // Import useCart
import { toast } from 'react-toastify'; // For out-of-stock messages
import CartSidebar from '../Utilites/CartSidebar'; // Import CartSidebar

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart visibility
  const { addToCart, updateQuantity, getTotalItems, getItemQuantity } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/`);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedTerm) ||
      (product.category && product.category.name.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleAddToCart = (product) => {
    const success = addToCart(product.id);
    if (!success) {
      toast.error(`${product.name} is out of stock!`, { position: "top-right", autoClose: 3000 });
    }else{
      toast.success(`${product.name} added to cart!`, { position: "top-right", autoClose: 2000 });
    }
  };

  if (loading) return <div className="text-center py-10 text-indigo-700 text-xl font-serif italic">Curating your exclusive collection...</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-center text-indigo-900 tracking-tight">Our Curated Collection</h1>
        <button 
          onClick={() => setIsCartOpen(true)}  
          className="relative bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition duration-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 animate-pulse">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>
      <LogOutButton />
      {/* Search Box - With focus animation */}
      <div className="max-w-lg mx-auto mb-10 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or category..."
          className="w-full p-3 pl-10 bg-white border border-indigo-200 rounded-md text-indigo-900 placeholder-indigo-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:scale-105 transition-all duration-300 shadow-sm"
        />
        <svg className="absolute left-3 top-3 h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-indigo-600 col-span-full font-serif">No matches found. Explore our full collection.</p>
        ) : (
          filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            return (
              <div 
                key={product.id} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md hover:rotate-1 relative ${quantity > 0 ? 'border border-indigo-300' : ''}`}
              >
                {product.image && (
                  <img
                    src={`http://localhost:8000${product.image}`}
                    alt={product.name}
                    className="w-full h-28 object-cover rounded-t-xl transition duration-300 hover:brightness-105"
                  />
                )}
                <div className="p-3 relative">
                  <h2 className="text-base font-serif font-semibold mb-1 text-indigo-900 truncate">{product.name}</h2>
                  <p className="text-xs text-gray-600 mb-1 line-clamp-2">{product.description}</p>
                  <p className="text-indigo-700 font-bold text-sm">${product.price}</p>
                  <p className="text-xs text-gray-500 mt-1 italic">Category: {product.category ? product.category.name : 'Uncategorized'}</p>
                  
                  {/* Cart Controls */}
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    {quantity > 0 ? (
                      <>
                        <button 
                          onClick={() => updateQuantity(product.id, -1)} 
                          className="text-indigo-600 hover:text-indigo-800 transition duration-200"
                          title="Remove one"
                        >
                          <FontAwesomeIcon icon={faMinus} size="xs" />
                        </button>
                        <span className="text-sm font-bold text-indigo-900">{quantity}</span>
                        <button 
                          onClick={() => handleAddToCart(product)} 
                          className="text-indigo-600 hover:text-indigo-800 transition duration-200"
                          title="Add more"
                        >
                          <FontAwesomeIcon icon={faPlus} size="xs" />
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleAddToCart(product)} 
                        className="text-indigo-600 hover:text-indigo-800 hover:scale-110 transition duration-200"
                        title="Add to Cart"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} size="sm" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Render CartSidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Products;
