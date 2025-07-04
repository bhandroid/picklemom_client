import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };
  
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { error: registrationError } = await signUp(
        formData.email,
        formData.password,
        formData.fullName
      );
      
      if (registrationError) {
        setError(registrationError);
        setLoading(false);
        return;
      }
      
      // Show success message
      setSuccess(true);
      
      // Clear form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
      });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Account created successfully! Please log in.' }
        });
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Register | The Pickle Mom</title>
        <meta name="description" content="Create an account to start shopping for delicious homemade pickles." />
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <div className="text-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-secondary-500 mb-2">
                  Create Account
                </h1>
                <p className="text-neutral-600">
                  Join us to start your pickle journey
                </p>
              </div>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-error-50 border border-error-200 text-error-700 p-4 rounded-md mb-6 flex items-center"
                >
                  <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-success-50 border border-success-200 text-success-700 p-4 rounded-md mb-6 flex items-center"
                >
                  <CheckCircle size={20} className="mr-2 flex-shrink-0" />
                  <span>Account created successfully! Redirecting to login...</span>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                    />
                    <User className="absolute left-3 top-2.5 text-neutral-400" size={18} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                    <Mail className="absolute left-3 top-2.5 text-neutral-400" size={18} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                    />
                    <Lock className="absolute left-3 top-2.5 text-neutral-400" size={18} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      placeholder="Confirm your password"
                      required
                      disabled={loading}
                    />
                    <Lock className="absolute left-3 top-2.5 text-neutral-400" size={18} />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-300 border-neutral-300 rounded"
                    required
                    disabled={loading}
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-neutral-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-500 hover:text-primary-600">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary-500 hover:text-primary-600">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading || success}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating Account...
                    </div>
                  ) : success ? (
                    <>
                      <CheckCircle size={18} className="mr-2" /> Account Created!
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} className="mr-2" /> Create Account
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-neutral-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;