import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Tag
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Promo Codes', href: '/admin/promos', icon: Tag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <h1 className="font-serif text-lg font-bold text-secondary-500">
          Admin Panel
        </h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-secondary-500 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-30 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-neutral-200">
          <h1 className="font-serif text-lg font-bold text-secondary-500">
            Admin Panel
          </h1>
        </div>
        
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-secondary-500 font-medium'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <item.icon size={18} className="mr-3" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
              <span className="text-neutral-700 font-medium">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-secondary-500">
                {user?.email}
              </p>
              <p className="text-xs text-neutral-500">
                Administrator
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            <span>Log out</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="max-w-7xl mx-auto p-4 md:p-6 pt-16 lg:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;