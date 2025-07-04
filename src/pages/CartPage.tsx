import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };
  
  return (
    <>
      <Helmet>
        <title>Your Cart | The Pickle Mom</title>
        <meta name="description" content="Review and edit your cart items before checkout." />
      </Helmet>
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary-500 mb-6">
            Your Cart
          </h1>
          
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mb-4 flex justify-center">
                <ShoppingCart size={64} className="text-neutral-300" />
              </div>
              <h2 className="text-xl font-medium text-secondary-500 mb-4">
                Your cart is empty
              </h2>
              <p className="text-neutral-600 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/products">
                <Button variant="primary">
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-secondary-500">
                          Product
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-secondary-500 hidden sm:table-cell">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-secondary-500">
                          Price
                        </th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-secondary-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="ml-4">
                                <h3 className="font-medium text-secondary-500">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-neutral-500 sm:hidden">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 border border-neutral-300 rounded-l hover:bg-neutral-100 disabled:opacity-50"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <div className="px-3 py-1 border-t border-b border-neutral-300 min-w-[40px] text-center">
                                {item.quantity}
                              </div>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 border border-neutral-300 rounded-r hover:bg-neutral-100"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-medium text-primary-500">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-error-500 hover:text-error-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <Link to="/products" className="text-neutral-600 hover:text-primary-500 transition-colors flex items-center">
                    <ArrowLeft size={16} className="mr-1" /> Continue Shopping
                  </Link>
                </div>
              </motion.div>
              
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-secondary-500 mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Shipping</span>
                      <span className="font-medium">₹50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Tax</span>
                      <span className="font-medium">₹{(cartTotal * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-3 flex justify-between">
                      <span className="font-medium text-secondary-500">Total</span>
                      <span className="font-bold text-secondary-500">
                        ₹{(cartTotal + 50 + cartTotal * 0.05).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <ShoppingBag size={18} className="mr-2" /> Proceed to Checkout
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-4 text-xs text-center text-neutral-500">
                    <p>Secure checkout powered by Razorpay</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-sm font-medium text-secondary-500 mb-2">
                    We Accept
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-6 bg-neutral-200 rounded"></div>
                    <div className="w-10 h-6 bg-neutral-200 rounded"></div>
                    <div className="w-10 h-6 bg-neutral-200 rounded"></div>
                    <div className="w-10 h-6 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;