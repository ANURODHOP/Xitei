import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import StripePayment from '../components/StripePayment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeItem, getTotalPrice, setCart } = useCart();
  const [checkoutMode, setCheckoutMode] = useState(false);

  const handlePaymentSuccess = () => {
    // Clear cart in context
    toast.success('Payment successful! Thank you for your purchase.');
    setCart({ items: [], total: 0 });
    setCheckoutMode(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 overflow-auto flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-indigo-900 font-serif">Your Cart</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {!checkoutMode ? (
          <>
            {cart.items.length === 0 ? (
              <p className="text-center text-gray-700 font-serif flex-grow flex items-center justify-center">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4 mb-6 flex-grow overflow-y-auto">
                  {cart.items.map(item => (
                    <li key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div className="flex items-center space-x-3">
                        <img src={`${import.meta.env.VITE_API_URL}${item.product.image}`} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className="font-serif text-indigo-900">{item.product.name}</p>
                          <p className="text-xs text-gray-600">${item.product.price} x {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-indigo-700 hover:text-indigo-900">
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-indigo-700 hover:text-indigo-900">
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-right font-bold text-indigo-900">Total: ${getTotalPrice()}</p>
                <button
                  onClick={() => setCheckoutMode(true)}
                  className="w-full mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer"
                >
                  Checkout
                </button>
              </>
            )}
          </>
        ) : (
          <StripePayment onPaymentSuccess={handlePaymentSuccess} onCloseCart={onClose} cart={cart}/>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
