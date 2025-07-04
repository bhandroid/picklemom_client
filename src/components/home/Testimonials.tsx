import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    quote: 'The Pickle Mom\'s mango pickle reminds me of my grandmother\'s recipe. Absolutely authentic flavors that take me back to my childhood!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    name: 'Raj Patel',
    location: 'Delhi',
    quote: 'I\'ve tried many pickle brands, but The Pickle Mom stands out for its freshness and quality. The mixed vegetable pickle is now a staple in our home.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    name: 'Anjali Reddy',
    location: 'Bangalore',
    quote: 'As someone who appreciates traditional food, I can say that these pickles are made with authentic methods and premium ingredients. Simply delicious!',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const currentTestimonial = testimonials[currentIndex];
  
  return (
    <section className="py-16 bg-secondary-500 text-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="What Our Customers Say"
          subtitle="Don't just take our word for it - hear from our happy customers who have made The Pickle Mom part of their culinary journey."
          className="text-white"
        />
        
        <div className="max-w-4xl mx-auto mt-12 relative">
          <div className="absolute -top-10 left-0 text-primary-500 opacity-30">
            <Quote size={80} />
          </div>
          
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-8 md:px-16 py-8"
          >
            <div className="mb-6">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary-500"
              />
            </div>
            
            <p className="text-lg md:text-xl italic mb-6">
              "{currentTestimonial.quote}"
            </p>
            
            <h3 className="font-serif font-bold text-primary-500 text-xl">
              {currentTestimonial.name}
            </h3>
            <p className="text-neutral-300">
              {currentTestimonial.location}
            </p>
          </motion.div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={prevTestimonial}
              className="mx-2 p-2 rounded-full bg-secondary-600 hover:bg-secondary-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`mx-1 w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-white opacity-30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            
            <button
              onClick={nextTestimonial}
              className="mx-2 p-2 rounded-full bg-secondary-600 hover:bg-secondary-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;