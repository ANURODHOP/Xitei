import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogOutButton from '../Utilites/LogOutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import CartSidebar from '../Utilites/CartSidebar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, updateQuantity, removeItem, getTotalItems, getItemQuantity, getCartItemByProductId } = useCart();

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

  const handleAddToCart = async (product) => {
    if (product.stocks <= 0) return;
    const res = await addToCart(product.id);
    if (!res.success) {
      toast.error(res.error, { position: "top-right", autoClose: 3000 });
    } else {
      toast.success(`${product.name} added to cart!`, { position: "top-right", autoClose: 2000 });
    }
  };

  const handleUpdateQuantity = async (product, change) => {
    const cartItem = getCartItemByProductId(product.id);
    if (!cartItem) return;
    
    const newQuantity = cartItem.quantity + change;
    
    if (newQuantity <= 0) {
      await removeItem(cartItem.id);
      return;
    }
    
    if (newQuantity > product.stocks) {
      toast.error(`Only ${product.stocks} units are available.`, { position: "top-right", autoClose: 3000 });
      return;
    }
    
    const res = await updateQuantity(cartItem.id, newQuantity);
    if (!res.success) {
      toast.error(res.error, { position: "top-right", autoClose: 3000 });
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-600 text-lg">Loading products...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Xitei Shop</h1>
          
          <div className="flex items-center space-x-6">
            <div className="relative flex-1 max-w-md hidden md:block">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}  
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <LogOutButton />
          </div>
        </div>
        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4 bg-white">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-10">No products found.</p>
          ) : (
            filteredProducts.map((product) => {
              const quantity = getItemQuantity(product.id);
              const outOfStock = product.stocks <= 0;
              
              return (
                <div 
                  key={product.id} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="relative pb-[100%] bg-white border-b border-gray-100">
                    {product.image ? (
                      <img
                        src={`http://localhost:8000${product.image}`}
                        alt={product.name}
                        className={`absolute top-0 left-0 w-full h-full object-contain p-4 ${outOfStock ? 'opacity-50 grayscale' : ''}`}
                      />
                    ) : (
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category?.name || 'General'}</p>
                    <h2 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h2>
                    <div className="mt-auto pt-2">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <div className="text-right">
                           {product.stocks > 5 ? (
                             <span className="text-xs font-medium text-green-700">In Stock</span>
                           ) : product.stocks > 0 ? (
                             <span className="text-xs font-medium text-orange-600">Only {product.stocks} left</span>
                           ) : (
                             <span className="text-xs font-medium text-red-600">Out of Stock</span>
                           )}
                        </div>
                      </div>
                      
                      {/* Cart Controls */}
                      <div className="h-9">
                        {quantity > 0 ? (
                          <div className="flex items-center justify-between border border-gray-300 rounded-md overflow-hidden h-full">
                            <button 
                              onClick={() => handleUpdateQuantity(product, -1)} 
                              className="w-1/3 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                              title="Decrease quantity"
                            >
                              <FontAwesomeIcon icon={faMinus} size="xs" />
                            </button>
                            <span className="w-1/3 text-center text-sm font-medium text-gray-900 bg-white border-l border-r border-gray-200 h-full flex items-center justify-center">{quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(product, 1)} 
                              disabled={quantity >= product.stocks}
                              className={`w-1/3 h-full flex items-center justify-center transition-colors ${quantity >= product.stocks ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'}`}
                              title="Increase quantity"
                            >
                              <FontAwesomeIcon icon={faPlus} size="xs" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleAddToCart(product)} 
                            disabled={outOfStock}
                            className={`w-full h-full rounded-md text-sm font-medium transition-colors flex items-center justify-center ${outOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black text-white'}`}
                          >
                            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Render CartSidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Products;
