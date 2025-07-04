import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import ProductCard from '../products/ProductCard';
import Button from '../ui/Button';
import { useProducts } from '../../hooks/useProducts';
import LoadingSpinner from '../ui/LoadingSpinner';

const FeaturedProducts = () => {
  const { products, loading, error, retry } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsToShow = 3;
  
  useEffect(() => {
    if (products && products.length > 0) {
      const featured = products.filter(product => product.featured);
      setFeaturedProducts(featured);
    }
  }, [products]);
  
  const nextSlide = () => {
    if (currentIndex + productsToShow < featuredProducts.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, featuredProducts.length - productsToShow));
    }
  };
  
  const visibleProducts = featuredProducts.slice(
    currentIndex,
    currentIndex + productsToShow
  );

  if (error) {
    return (
      <section className="py-16 bg-accent-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Signature Pickles"
            subtitle="Discover our most popular homemade pickle varieties, crafted with traditional recipes and the freshest ingredients."
          />
          
          <div className="text-center py-12">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="text-error-500 mr-2\" size={24} />
              <p className="text-error-500 font-medium">Failed to load products</p>
            </div>
            <p className="text-neutral-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="primary" 
                onClick={retry}
              >
                <RefreshCw size={16} className="mr-2" />
                Try Again
              </Button>
              <Link to="/products">
                <Button variant="outline">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-accent-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Signature Pickles"
          subtitle="Discover our most popular homemade pickle varieties, crafted with traditional recipes and the freshest ingredients."
        />
        
        {loading ? (
          <div className="text-center py-12">
            <LoadingSpinner />
            <p className="text-neutral-600 mt-4">Loading featured products...</p>
          </div>
        ) : featuredProducts.length > 0 ? (
          <>
            <div className="relative">
              {featuredProducts.length > productsToShow && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-primary-50 focus:outline-none"
                    aria-label="Previous products"
                  >
                    <ChevronLeft size={24} className="text-secondary-500" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-primary-50 focus:outline-none"
                    aria-label="Next products"
                  >
                    <ChevronRight size={24} className="text-secondary-500" />
                  </button>
                </>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/products">
                <Button variant="outline" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600 mb-6">No featured products available at the moment.</p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="primary" 
                onClick={retry}
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </Button>
              <Link to="/products">
                <Button variant="outline">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;