import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-500 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo size={40} light />
              <span className="ml-3 text-xl font-serif font-bold">The Pickle Mom</span>
            </div>
            <p className="mb-4 text-neutral-300">
              Artisanal, homemade pickles crafted with love, 
              using traditional recipes and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/thepicklemom1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/thepicklemom" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/thepicklemom" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Shop All Pickles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Blog & Recipes
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-primary-500" />
                <a href="tel:+919100109103" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  +91 9100109103
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-primary-500" />
                <a href="mailto:hello@thepicklemom.com" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  hello@thepicklemom.com
                </a>
              </li>
              <li className="mt-4">
                <a 
                  href="https://wa.me/919100109103" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-500 text-secondary-500 font-medium px-4 py-2 rounded hover:bg-primary-600 transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-700 text-sm text-neutral-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} The Pickle Mom. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Made with ♥ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;