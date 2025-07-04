import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Users, 
  BarChart2, 
  Package,
  ArrowUp,
  ArrowDown,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AdminLayout from '../../components/admin/AdminLayout';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [dashboardLoading, setDashboardLoading] = useState(true);
  
  // Mock data for admin dashboard
  const dashboardData = {
    totalSales: 24500,
    totalOrders: 48,
    totalCustomers: 35,
    totalProducts: 15,
    recentOrders: [
      { id: 'ORD-001', customer: 'Raj Patel', amount: 750, status: 'delivered', date: '2023-05-15' },
      { id: 'ORD-002', customer: 'Priya Sharma', amount: 1250, status: 'processing', date: '2023-05-16' },
      { id: 'ORD-003', customer: 'Arjun Reddy', amount: 500, status: 'pending', date: '2023-05-16' },
      { id: 'ORD-004', customer: 'Sneha Gupta', amount: 950, status: 'delivered', date: '2023-05-17' },
      { id: 'ORD-005', customer: 'Vikram Singh', amount: 1100, status: 'processing', date: '2023-05-17' },
    ],
    popularProducts: [
      { id: '1', name: 'Spicy Mango Pickle', sales: 15, stock: 25 },
      { id: '2', name: 'Garlic Pickle', sales: 12, stock: 18 },
      { id: '3', name: 'Mixed Vegetable Pickle', sales: 10, stock: 22 },
    ]
  };
  
  useEffect(() => {
    // Check if user is admin
    if (!loading && user && !user.isAdmin) {
      navigate('/');
      return;
    }
    
    if (!loading && !user) {
      navigate('/login');
      return;
    }
    
    // Simulate loading dashboard data
    if (user?.isAdmin) {
      setTimeout(() => {
        setDashboardLoading(false);
      }, 500);
    }
  }, [user, loading, navigate]);
  
  // Show loading while checking auth
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (!user.isAdmin) {
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | The Pickle Mom</title>
      </Helmet>
      
      <AdminLayout>
        <h1 className="text-2xl font-serif font-bold text-secondary-500 mb-6">
          Dashboard Overview
        </h1>
        
        {dashboardLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-neutral-500 text-sm mb-1">Total Sales</p>
                    <h3 className="text-2xl font-bold text-secondary-500">
                      ₹{dashboardData.totalSales.toLocaleString()}
                    </h3>
                    <p className="flex items-center text-xs text-success-500 mt-2">
                      <ArrowUp size={12} className="mr-1" /> 12% from last month
                    </p>
                  </div>
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <DollarSign className="text-primary-500" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-neutral-500 text-sm mb-1">Orders</p>
                    <h3 className="text-2xl font-bold text-secondary-500">
                      {dashboardData.totalOrders}
                    </h3>
                    <p className="flex items-center text-xs text-success-500 mt-2">
                      <ArrowUp size={12} className="mr-1" /> 8% from last month
                    </p>
                  </div>
                  <div className="bg-secondary-100 p-3 rounded-lg">
                    <ShoppingBag className="text-secondary-500" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-neutral-500 text-sm mb-1">Customers</p>
                    <h3 className="text-2xl font-bold text-secondary-500">
                      {dashboardData.totalCustomers}
                    </h3>
                    <p className="flex items-center text-xs text-success-500 mt-2">
                      <ArrowUp size={12} className="mr-1" /> 15% from last month
                    </p>
                  </div>
                  <div className="bg-accent-100 p-3 rounded-lg">
                    <Users className="text-accent-700" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-neutral-500 text-sm mb-1">Products</p>
                    <h3 className="text-2xl font-bold text-secondary-500">
                      {dashboardData.totalProducts}
                    </h3>
                    <p className="flex items-center text-xs text-error-500 mt-2">
                      <ArrowDown size={12} className="mr-1" /> 3% from last month
                    </p>
                  </div>
                  <div className="bg-warning-100 p-3 rounded-lg">
                    <Package className="text-warning-500" size={20} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Orders & Popular Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-200">
                  <h3 className="font-medium text-secondary-500">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 text-sm text-neutral-500">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium">Order ID</th>
                        <th className="px-6 py-3 text-left font-medium">Customer</th>
                        <th className="px-6 py-3 text-left font-medium">Amount</th>
                        <th className="px-6 py-3 text-left font-medium">Status</th>
                        <th className="px-6 py-3 text-left font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {dashboardData.recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-neutral-50">
                          <td className="px-6 py-4 text-sm font-medium text-secondary-500">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-600">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-600">
                            ₹{order.amount}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              order.status === 'delivered' 
                                ? 'bg-success-100 text-success-700'
                                : order.status === 'processing'
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-warning-100 text-warning-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-600">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-200">
                  <h3 className="font-medium text-secondary-500">Popular Products</h3>
                </div>
                <div className="p-6">
                  {dashboardData.popularProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="mb-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0 last:mb-0"
                    >
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium text-secondary-500">{product.name}</h4>
                        <span className="text-sm text-neutral-500">{product.sales} sold</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">Stock: {product.stock} units</span>
                        <span 
                          className={`${
                            product.stock > 20 
                              ? 'text-success-500'
                              : product.stock > 10
                              ? 'text-warning-500'
                              : 'text-error-500'
                          }`}
                        >
                          {product.stock > 20 
                            ? 'In Stock'
                            : product.stock > 10
                            ? 'Low Stock'
                            : 'Critical Stock'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </AdminLayout>
    </>
  );
};

export default DashboardPage;