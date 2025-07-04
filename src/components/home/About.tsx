import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import AboutImage from '../images/Women.png';
const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden">
              <img
                src={AboutImage}
                alt="Woman preparing homemade pickles"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary-500 w-32 h-32 rounded-lg flex items-center justify-center">
              <span className="font-serif font-bold text-secondary-500 text-xl">Since 2018</span>
            </div>
          </motion.div>
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary-500 mb-6">
              The Pickle Mom Story
            </h2>
            
            <div className="w-20 h-1 bg-primary-500 mb-6" />
            
            <p className="text-neutral-700 mb-4">
              The Pickle Mom began with a passion for preserving traditional flavors and a desire to share homemade goodness with the world. What started as a hobby in our family kitchen has grown into a beloved artisanal pickle brand.
            </p>
            
            <p className="text-neutral-700 mb-6">
              Each jar of our pickles is carefully crafted using time-honored recipes passed down through generations. We use only the freshest, locally-sourced ingredients and traditional pickling methods to ensure authentic flavors and the perfect crunch in every bite.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 border border-neutral-200 rounded-lg">
                <h3 className="font-serif font-bold text-primary-500 text-2xl mb-2">100%</h3>
                <p className="text-sm text-neutral-600">Natural Ingredients</p>
              </div>
              <div className="text-center p-4 border border-neutral-200 rounded-lg">
                <h3 className="font-serif font-bold text-primary-500 text-2xl mb-2">30+</h3>
                <p className="text-sm text-neutral-600">Unique Recipes</p>
              </div>
              <div className="text-center p-4 border border-neutral-200 rounded-lg">
                <h3 className="font-serif font-bold text-primary-500 text-2xl mb-2">5000+</h3>
                <p className="text-sm text-neutral-600">Happy Customers</p>
              </div>
            </div>
            
            <Link to="/about">
              <Button variant="secondary" size="lg">
                Read Our Full Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;