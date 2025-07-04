import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | The Pickle Mom</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-accent-50 px-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-6xl font-bold text-secondary-500 mb-4">
              404
            </h1>
            <h2 className="text-2xl font-medium text-secondary-500 mb-4">
              Page Not Found
            </h2>
            <p className="text-neutral-600 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button variant="primary">
                  <Home size={18} className="mr-2" /> Go Home
                </Button>
              </Link>
              <button onClick={() => window.history.back()}>
                <Button variant="outline">
                  <ArrowLeft size={18} className="mr-2" /> Go Back
                </Button>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;