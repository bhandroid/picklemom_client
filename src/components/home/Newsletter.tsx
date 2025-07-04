import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual newsletter subscription logic
    console.log('Subscribed with email:', email);
    setSubmitted(true);
    setEmail('');
    
    // Reset submission status after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <section className="py-16 bg-accent-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary-500 mb-4">
              Join Our Pickle Club
            </h2>
            <p className="text-neutral-600 mb-8">
              Subscribe to our newsletter for exclusive recipes, special offers, and be the first to know about new pickle varieties. Plus, get 10% off your first order!
            </p>
          </motion.div>
          
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
              required
            />
            <Button 
              type="submit" 
              variant="secondary" 
              className="px-6 py-3 md:whitespace-nowrap"
            >
              Subscribe <Send size={16} className="ml-2" />
            </Button>
          </motion.form>
          
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-success-600"
            >
              Thank you for subscribing! Check your email for confirmation.
            </motion.div>
          )}
          
          <p className="text-sm text-neutral-500 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;