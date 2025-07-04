import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ScrollToTop from './components/utils/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './hooks/useAuth';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/admin/ProductsPage'));
const AdminOrdersPage = lazy(() => import('./pages/admin/OrdersPage'));
const AdminCustomersPage = lazy(() => import('./pages/admin/CustomersPage'));
const AdminPromoCodesPage = lazy(() => import('./pages/admin/PromoCodesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/*" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<AdminDashboardPage />} />
                  <Route path="/products" element={<AdminProductsPage />} />
                  <Route path="/orders" element={<AdminOrdersPage />} />
                  <Route path="/promos" element={<AdminPromoCodesPage />} />
                  <Route path="/customers" element={<AdminCustomersPage />} />
                </Routes>
              </Suspense>
            } />

            {/* Public routes */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/products/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/account" element={<AccountPage />} />
                      <Route path="/orders" element={<OrderHistoryPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;