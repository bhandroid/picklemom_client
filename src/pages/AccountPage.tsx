import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, CreditCard, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const AccountPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) return null;
  
  return (
    <>
      <Helmet>
        <title>My Account | The Pickle Mom</title>
        <meta 
          name="description" 
          content="Manage your account settings and view your order history." 
        />
      </Helmet>
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl md:text-4xl font-bold text-secondary-500 mb-8"
            >
              My Account
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-6">
                  <User className="text-primary-500" size={24} />
                  <h2 className="font-serif text-xl font-bold text-secondary-500 ml-3">
                    Profile Information
                  </h2>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email
                    </label>
                    <p className="text-secondary-500">{user.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <Button variant="primary">
                  Update Profile
                </Button>
              </motion.div>
              
              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-6">
                  <MapPin className="text-primary-500" size={24} />
                  <h2 className="font-serif text-xl font-bold text-secondary-500 ml-3">
                    Shipping Address
                  </h2>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      placeholder="Enter your shipping address"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        placeholder="City"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>
                </div>
                
                <Button variant="primary">
                  Update Address
                </Button>
              </motion.div>
              
              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6 md:col-span-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Package className="text-primary-500" size={24} />
                    <h2 className="font-serif text-xl font-bold text-secondary-500 ml-3">
                      Recent Orders
                    </h2>
                  </div>
                  
                  <Button variant="outline" onClick={() => navigate('/orders')}>
                    View All Orders
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 text-sm text-neutral-500">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium">Order ID</th>
                        <th className="px-6 py-3 text-left font-medium">Date</th>
                        <th className="px-6 py-3 text-left font-medium">Status</th>
                        <th className="px-6 py-3 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      <tr className="hover:bg-neutral-50">
                        <td className="px-6 py-4 text-secondary-500">#ORD-001</td>
                        <td className="px-6 py-4 text-neutral-600">May 15, 2025</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700">
                            Delivered
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">₹750.00</td>
                      </tr>
                      <tr className="hover:bg-neutral-50">
                        <td className="px-6 py-4 text-secondary-500">#ORD-002</td>
                        <td className="px-6 py-4 text-neutral-600">May 12, 2025</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700">
                            Processing
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">₹1,250.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
              
              {/* Payment Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6 md:col-span-2"
              >
                <div className="flex items-center mb-6">
                  <CreditCard className="text-primary-500" size={24} />
                  <h2 className="font-serif text-xl font-bold text-secondary-500 ml-3">
                    Payment Methods
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-neutral-200 rounded"></div>
                      <div className="ml-4">
                        <p className="font-medium text-secondary-500">•••• •••• •••• 4242</p>
                        <p className="text-sm text-neutral-500">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Add New Payment Method
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;