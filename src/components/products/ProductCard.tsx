import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        layout
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 }
            }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Quick Actions */}
          <motion.div
            className="absolute inset-0 bg-secondary-500/30 flex items-end justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-2">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                className="flex items-center"
              >
                <ShoppingCart size={16} className="mr-1" /> Add to Cart
              </Button>
              <button
                className="p-2 bg-white rounded-full text-secondary-500 hover:text-primary-500 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={16} />
              </button>
            </div>
          </motion.div>
          
          {/* Category Tag */}
          <div className="absolute top-2 left-2">
            <span className="bg-primary-500 text-secondary-500 text-xs font-medium px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-serif font-medium text-lg text-secondary-500">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium text-primary-500">
              ₹{product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 fill-current text-primary-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-neutral-500 ml-1">(24)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;