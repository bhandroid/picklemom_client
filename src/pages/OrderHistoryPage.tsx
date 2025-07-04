import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Eye } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Mock order data
  const orders = [
    {
      id: 'ORD-001',
      date: 'May 15, 2025',
      status: 'delivered',
      items: [
        { name: 'Spicy Mango Pickle', quantity: 2, price: 199 },
        { name: 'Garlic Pickle', quantity: 1, price: 149 }
      ],
      total: 750,
    },
    {
      id: 'ORD-002',
      date: 'May 12, 2025',
      status: 'processing',
      items: [
        { name: 'Mixed Vegetable Pickle', quantity: 3, price: 179 },
        { name: 'Lemon Pickle', quantity: 2, price: 129 }
      ],
      total: 1250,
    },
    {
      id: 'ORD-003',
      date: 'May 10, 2025',
      status: 'delivered',
      items: [
        { name: 'Green Chilli Pickle', quantity: 1, price: 159 },
        { name: 'Sweet Ginger Pickle', quantity: 2, price: 189 }
      ],
      total: 950,
    }
  ];
  
  if (!user) return null;
  
  return (
    <>
      <Helmet>
        <title>Order History | The Pickle Mom</title>
        <meta 
          name="description" 
          content="View your order history and track your deliveries." 
        />
      </Helmet>
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Package className="text-primary-500" size={32} />
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-serif text-3xl md:text-4xl font-bold text-secondary-500 ml-4"
              >
                Order History
              </motion.h1>
            </div>
            
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-neutral-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-secondary-500 mb-1">
                          Order {order.id}
                        </p>
                        <p className="text-sm text-neutral-500">
                          Placed on {order.date}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-success-100 text-success-700'
                            : order.status === 'processing'
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-warning-100 text-warning-700'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        
                        <Button variant="outline" size="sm">
                          <Eye size={16} className="mr-2" /> View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-neutral-50 text-sm text-neutral-500">
                        <tr>
                          <th className="px-6 py-3 text-left font-medium">Product</th>
                          <th className="px-6 py-3 text-center font-medium">Quantity</th>
                          <th className="px-6 py-3 text-right font-medium">Price</th>
                          <th className="px-6 py-3 text-right font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {order.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="hover:bg-neutral-50">
                            <td className="px-6 py-4 font-medium text-secondary-500">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 text-center text-neutral-600">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 text-right text-neutral-600">
                              ₹{item.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-right font-medium text-secondary-500">
                              ₹{(item.quantity * item.price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-neutral-50">
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-right font-medium">
                            Order Total:
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-primary-500">
                            ₹{order.total.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  
                  {/* Order Actions */}
                  <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                    <div className="flex justify-end gap-4">
                      <Button variant="outline" size="sm">
                        Download Invoice
                      </Button>
                      {order.status === 'delivered' && (
                        <Button variant="primary" size="sm">
                          Buy Again
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryPage;