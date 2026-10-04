import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import StripePayment from '../components/StripePayment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faPlus, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeItem, getTotalPrice, setCart } = useCart();
  const [checkoutMode, setCheckoutMode] = useState(false);

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Thank you for your purchase.');
    setCart({ items: [], total: 0 });
    setCheckoutMode(false);
  };

  const handleUpdate = async (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      await removeItem(item.id);
      return;
    }
    if (newQuantity > item.product.stocks) {
      toast.error(`Only ${item.product.stocks} units are available.`, { position: "top-right", autoClose: 3000 });
      return;
    }
    const res = await updateQuantity(item.id, newQuantity);
    if (res && !res.success) {
      toast.error(res.error, { position: "top-right" });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" onClick={onClose}></div>
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-xl z-50 flex flex-col transform transition-transform">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {!checkoutMode ? (
          <>
            {(!cart.items || cart.items.length === 0) ? (
              <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                </div>
                <p className="text-gray-500 font-medium">Your cart is currently empty.</p>
                <button 
                  onClick={onClose}
                  className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition-colors text-sm font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto p-6">
                  <ul className="space-y-6">
                    {cart.items.map(item => {
                      const outOfStock = item.product.stocks === 0;
                      return (
                        <li key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                          <div className="w-20 h-20 bg-white rounded border border-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                            {item.product.image ? (
                              <img src={`${import.meta.env.VITE_API_URL}${item.product.image}`} alt={item.product.name} className={`w-full h-full object-contain p-1 ${outOfStock ? 'opacity-50 grayscale' : ''}`} />
                            ) : (
                              <span className="text-xs text-gray-400">No Img</span>
                            )}
                          </div>
                          
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="text-sm font-medium text-gray-900 pr-4 line-clamp-2">{item.product.name}</h3>
                                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Remove">
                                  <FontAwesomeIcon icon={faTrash} size="sm" />
                                </button>
                              </div>
                              <p className="text-sm font-bold text-gray-900 mt-1">${item.product.price}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-gray-300 rounded h-8 w-24 bg-white overflow-hidden">
                                <button 
                                  onClick={() => handleUpdate(item, -1)} 
                                  className="w-1/3 h-full flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                  <FontAwesomeIcon icon={faMinus} size="xs" />
                                </button>
                                <span className="w-1/3 h-full text-center text-sm font-medium text-gray-900 flex items-center justify-center border-l border-r border-gray-200">{item.quantity}</span>
                                <button 
                                  onClick={() => handleUpdate(item, 1)}
                                  disabled={item.quantity >= item.product.stocks}
                                  className={`w-1/3 h-full flex items-center justify-center transition-colors ${item.quantity >= item.product.stocks ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                >
                                  <FontAwesomeIcon icon={faPlus} size="xs" />
                                </button>
                              </div>
                              
                              <div className="text-right text-xs">
                                {item.product.stocks > 5 ? (
                                   <span className="text-green-700 font-medium">In Stock</span>
                                ) : item.product.stocks > 0 ? (
                                   <span className="text-orange-600 font-medium">Only {item.product.stocks} left</span>
                                ) : (
                                   <span className="text-red-600 font-medium">Out of Stock</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4 text-gray-900">
                    <span className="font-medium text-sm">Subtotal</span>
                    <span className="text-lg font-bold">${getTotalPrice()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                  
                  <button
                    onClick={() => setCheckoutMode(true)}
                    disabled={cart.items.some(item => item.product.stocks === 0 || item.quantity > item.product.stocks)}
                    className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-black transition-colors font-medium flex justify-center items-center disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>
                  {cart.items.some(item => item.product.stocks === 0 || item.quantity > item.product.stocks) && (
                    <p className="text-xs text-red-500 mt-3 text-center font-medium">Please update your cart to match available stock.</p>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex-grow overflow-y-auto p-6">
             <button onClick={() => setCheckoutMode(false)} className="mb-4 text-sm font-medium text-gray-600 hover:text-gray-900">&larr; Back to Cart</button>
             <StripePayment onPaymentSuccess={handlePaymentSuccess} onCloseCart={onClose} cart={cart}/>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
