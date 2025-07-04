import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <>
      <Helmet>
        <title>Contact Us | The Pickle Mom</title>
        <meta 
          name="description" 
          content="Get in touch with The Pickle Mom. We'd love to hear from you!" 
        />
      </Helmet>
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-secondary-500 mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neutral-600"
            >
              Have a question about our products? Want to place a bulk order? 
              We'd love to hear from you!
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-serif text-xl font-bold text-secondary-500 mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="text-primary-500 mt-1" size={20} />
                    <div className="ml-4">
                      <p className="font-medium text-secondary-500">Phone</p>
                      <a 
                        href="tel:+919100109103" 
                        className="text-neutral-600 hover:text-primary-500 transition-colors"
                      >
                        +91 9100109103
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-primary-500 mt-1" size={20} />
                    <div className="ml-4">
                      <p className="font-medium text-secondary-500">Email</p>
                      <a 
                        href="mailto:hello@thepicklemom.com" 
                        className="text-neutral-600 hover:text-primary-500 transition-colors"
                      >
                        hello@thepicklemom.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-primary-500 mt-1" size={20} />
                    <div className="ml-4">
                      <p className="font-medium text-secondary-500">Address</p>
                      <p className="text-neutral-600">
                        123 Pickle Street<br />
                        Hyderabad, Telangana 500081<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-primary-500 mt-1" size={20} />
                    <div className="ml-4">
                      <p className="font-medium text-secondary-500">Business Hours</p>
                      <p className="text-neutral-600">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-serif text-xl font-bold text-secondary-500 mb-4">
                  Find Us
                </h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2967247847473!2d78.45256661487657!3d17.445229988043825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c8b8d8f9d9%3A0x3b3b1e2b1e8f8b8b!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-serif text-xl font-bold text-secondary-500 mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          Send Message <Send size={18} className="ml-2" />
                        </>
                      )}
                    </Button>
                    
                    {submitSuccess && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-success-600 mt-4"
                      >
                        Thank you for your message! We'll get back to you soon.
                      </motion.p>
                    )}
                  </div>
                </form>
              </div>
              
              {/* FAQ Section */}
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="font-serif text-xl font-bold text-secondary-500 mb-6">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-secondary-500 mb-2">
                      Do you offer bulk orders?
                    </h3>
                    <p className="text-neutral-600">
                      Yes, we offer special pricing for bulk orders. Please contact us with your 
                      requirements for a custom quote.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-secondary-500 mb-2">
                      What are your shipping times?
                    </h3>
                    <p className="text-neutral-600">
                      We typically process and ship orders within 1-2 business days. Delivery 
                      times vary by location but usually take 3-5 business days.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-secondary-500 mb-2">
                      Do you ship internationally?
                    </h3>
                    <p className="text-neutral-600">
                      Currently, we only ship within India. We're working on expanding our 
                      shipping options to serve international customers.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;