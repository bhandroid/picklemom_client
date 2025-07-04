import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import bgImage from '../images/bg.png';
const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Assorted pickles in jars"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/80 to-secondary-500/40" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
              Artisanal Pickles <br />
              <span className="text-primary-500">Crafted with Love</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-white/90 mb-8">
              Discover our handcrafted, small-batch pickles made with traditional recipes
              and the freshest ingredients. A taste of homemade goodness in every jar.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/products">
              <Button variant="primary" size="lg">
                Shop Now <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;