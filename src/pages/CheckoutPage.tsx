import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Shield, ArrowRight, Tag, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { validatePromoCode } from '../lib/promos';
import CheckoutButton from '../components/CheckoutButton';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<any>(null);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setPromoLoading(true);
    setPromoError('');
    
    try {
      const result = await validatePromoCode(promoCode.trim(), cartTotal);
      setPromoDiscount(result);
    } catch (error: any) {
      setPromoError(error.message || 'Invalid promo code');
      setPromoDiscount(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setPromoDiscount(null);
    setPromoError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // TODO: Implement actual payment processing
    setTimeout(() => {
      clearCart();
      navigate('/thank-you');
    }, 2000);
  };

  const shippingCost = 50;
  const taxRate = 0.05;
  const subtotal = cartTotal;
  const discountAmount = promoDiscount?.discountAmount || 0;
  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * taxRate;
  const finalTotal = discountedSubtotal + shippingCost + tax;
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>Checkout | The Pickle Mom</title>
      </Helmet>
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary-500 mb-6">
              Checkout
            </h1>
            
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="font-medium text-lg text-secondary-500 mb-4">
                Order Summary
              </h2>
              
              <div className="divide-y divide-neutral-200">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-secondary-500">{item.name}</h3>
                        <p className="text-sm text-neutral-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-primary-500">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Promo Code Section */}
              <div className="border-t border-neutral-200 mt-4 pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={18} className="text-primary-500" />
                  <span className="font-medium text-secondary-500">Promo Code</span>
                </div>
                
                {!promoDiscount ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                    <Button
                      onClick={handleApplyPromo}
                      variant="outline"
                      disabled={!promoCode.trim() || promoLoading}
                    >
                      {promoLoading ? 'Applying...' : 'Apply'}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-success-50 border border-success-200 rounded-md">
                    <div>
                      <span className="font-medium text-success-700">{promoDiscount.code}</span>
                      {promoDiscount.description && (
                        <p className="text-sm text-success-600">{promoDiscount.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-success-700 font-medium">
                        -₹{promoDiscount.discountAmount.toFixed(2)}
                      </span>
                      <button
                        onClick={handleRemovePromo}
                        className="text-success-600 hover:text-success-800"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
                
                {promoError && (
                  <p className="text-error-500 text-sm mt-2">{promoError}</p>
                )}
              </div>
              
              <div className="border-t border-neutral-200 mt-4 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                {promoDiscount && (
                  <div className="flex justify-between mb-2">
                    <span className="text-success-600">Discount ({promoDiscount.code})</span>
                    <span className="font-medium text-success-600">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-neutral-600">Tax (5%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-secondary-500">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
                {promoDiscount && (
                  <div className="text-sm text-success-600 mt-2">
                    You saved ₹{discountAmount.toFixed(2)} with promo code {promoDiscount.code}!
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Checkout Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
            >
              <CheckoutButton amount={500} /> {/* Amount in INR */}
              {/* Shipping Information */}
              <div className="mb-8">
                <h2 className="font-medium text-lg text-secondary-500 mb-4">
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              
              
              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center justify-center p-4 bg-neutral-50 rounded-lg">
                  <Shield className="text-success-500 mr-2" size={20} />
                  <span className="text-sm text-neutral-600">Secure Payment</span>
                </div>
                <div className="flex items-center justify-center p-4 bg-neutral-50 rounded-lg">
                  <Truck className="text-primary-500 mr-2" size={20} />
                  <span className="text-sm text-neutral-600">Fast Delivery</span>
                </div>
                <div className="flex items-center justify-center p-4 bg-neutral-50 rounded-lg">
                  <CreditCard className="text-secondary-500 mr-2" size={20} />
                  <span className="text-sm text-neutral-600">Easy Payment</span>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing Order...
                  </div>
                ) : (
                  <>
                    Complete Order <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </Button>
              
              <p className="text-xs text-center text-neutral-500 mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;