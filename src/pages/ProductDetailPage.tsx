import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading, error } = useProducts();
  const product = products && id ? products.find((p) => String(p.id) === id) : null;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  if (loading) return <LoadingSpinner />;
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-serif font-bold text-secondary-500 mb-4">
          Product Not Found
        </h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button variant="primary">
            <ArrowLeft size={16} className="mr-2" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{product.name} | The Pickle Mom</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/products" className="text-neutral-600 hover:text-primary-500 transition-colors flex items-center">
              <ArrowLeft size={16} className="mr-1" /> Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </motion.div>
            
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-primary-500 inline-block px-3 py-1 rounded text-xs font-medium text-secondary-500 mb-2">
                {product.category}
              </div>
              
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary-500 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 fill-current text-primary-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-neutral-500">(24 reviews)</span>
              </div>
              
              <p className="text-2xl font-medium text-primary-500 mb-6">
                ₹{product.price.toFixed(2)}
              </p>
              
              <p className="text-neutral-700 mb-8">
                {product.description}
              </p>
              
              <div className="mb-8">
                <p className="font-medium text-secondary-500 mb-2">Quantity</p>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 border border-neutral-300 rounded-l hover:bg-neutral-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="px-4 py-2 border-t border-b border-neutral-300 min-w-[50px] text-center">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 border border-neutral-300 rounded-r hover:bg-neutral-100"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="flex-grow sm:flex-grow-0"
                >
                  <ShoppingCart size={18} className="mr-2" /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="p-3 sm:p-3"
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="p-3 sm:p-3"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </Button>
              </div>
              
              <div className="border-t border-neutral-200 pt-6">
                <p className="text-sm text-neutral-600 mb-2">
                  <span className="font-medium">Weight:</span> 250g
                </p>
                <p className="text-sm text-neutral-600 mb-2">
                  <span className="font-medium">Ingredients:</span> Mango, Salt, Spices, Mustard Oil
                </p>
                <p className="text-sm text-neutral-600">
                  <span className="font-medium">Storage:</span> Store in a cool, dry place. Refrigerate after opening.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;