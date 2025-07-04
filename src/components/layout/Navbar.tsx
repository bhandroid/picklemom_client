import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { color, motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import Logo from '../ui/Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const { user, signOut, loading } = useAuth();
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-secondary-500 text-white shadow-lg py-2' 
      : 'bg-transparent text-secondary-500 py-4'
  }`;
  
  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size={40} />
          <span className="ml-2 font-serif text-xl font-bold">The Pickle Mom</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-primary-500 transition-colors" >
            Home
          </Link>
          <Link to="/products" className="font-medium hover:text-primary-500 transition-colors">
            Products
          </Link>
          <Link to="/about" className="font-medium hover:text-primary-500 transition-colors">
            About
          </Link>
          <Link to="/contact" className="font-medium hover:text-primary-500 transition-colors">
            Contact
          </Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {!loading && user ? (
            <div className="relative">
              <button
                className="flex items-center font-medium hover:text-primary-500 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User size={20} className="mr-1" />
                <span className="mr-1">Account</span>
                <ChevronDown size={16} />
              </button>
              
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <Link 
                    to="/account" 
                    className="block px-4 py-2 text-secondary-500 hover:bg-primary-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-secondary-500 hover:bg-primary-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Order History
                  </Link>
                  {user.isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-secondary-500 hover:bg-primary-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-secondary-500 hover:bg-primary-50"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : !loading ? (
            <Link to="/login" className="font-medium hover:text-primary-500 transition-colors">
              <User size={20} className="mr-1 inline" />
              Login
            </Link>
          ) : (
            <div className="w-16 h-6 bg-neutral-200 animate-pulse rounded"></div>
          )}
          
          <Link to="/cart" className="relative font-medium hover:text-primary-500 transition-colors">
            <ShoppingCart size={20} className="inline" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="relative mr-6">
            <ShoppingCart size={20} className={isScrolled ? 'text-white' : 'text-secondary-500'} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled ? 'text-white' : 'text-secondary-500'} />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-white' : 'text-secondary-500'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 font-medium text-secondary-500">
              Home
            </Link>
            <Link to="/products" className="py-2 font-medium text-secondary-500">
              Products
            </Link>
            <Link to="/about" className="py-2 font-medium text-secondary-500">
              About
            </Link>
            <Link to="/contact" className="py-2 font-medium text-secondary-500">
              Contact
            </Link>
            
            {!loading && user ? (
              <>
                <Link to="/account" className="py-2 font-medium text-secondary-500">
                  My Account
                </Link>
                <Link to="/orders" className="py-2 font-medium text-secondary-500">
                  Order History
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="py-2 font-medium text-secondary-500">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleSignOut}
                  className="py-2 font-medium text-secondary-500 text-left"
                >
                  Logout
                </button>
              </>
            ) : !loading ? (
              <Link to="/login" className="py-2 font-medium text-secondary-500">
                Login / Register
              </Link>
            ) : (
              <div className="py-2">
                <div className="w-24 h-4 bg-neutral-200 animate-pulse rounded"></div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;