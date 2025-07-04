import { Helmet } from 'react-helmet';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>The Pickle Mom - Artisanal Homemade Pickles</title>
        <meta 
          name="description" 
          content="Discover artisanal, homemade pickles from The Pickle Mom. Handcrafted with love and tradition." 
        />
      </Helmet>
      
      <Hero />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default HomePage;