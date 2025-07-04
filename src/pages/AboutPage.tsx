import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Leaf } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import AboutImage from '../components/images/Women.png';
const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Story | The Pickle Mom</title>
        <meta 
          name="description" 
          content="Learn about The Pickle Mom's journey, our commitment to quality, and our traditional pickle-making process." 
        />
      </Helmet>
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-secondary-500 mb-6"
            >
              Our Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600"
            >
              From a family kitchen to homes across India, discover how The Pickle Mom 
              is preserving tradition one jar at a time.
            </motion.p>
          </div>
          
          {/* Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={AboutImage}
                alt="Traditional pickle making process"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-3xl font-bold text-secondary-500 mb-6">
                A Journey of Flavors
              </h2>
              <div className="w-20 h-1 bg-primary-500 mb-6" />
              <p className="text-neutral-600 mb-4">
                The Pickle Mom began in 2018 with a simple mission: to share the authentic 
                taste of homemade pickles with food lovers everywhere. What started as a 
                hobby in our family kitchen has grown into a beloved brand that brings 
                traditional flavors to homes across India.
              </p>
              <p className="text-neutral-600">
                Every jar of our pickles carries forward age-old recipes passed down through 
                generations, carefully preserved and crafted to perfection. We use only the 
                finest ingredients, traditional methods, and lots of love to create pickles 
                that taste just like the ones from your mother's kitchen.
              </p>
            </motion.div>
          </div>
          
          {/* Values Section */}
          <div className="bg-accent-50 rounded-lg p-8 md:p-12 mb-16">
            <SectionTitle
              title="Our Values"
              subtitle="The principles that guide everything we do"
              centered={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-primary-500" size={32} />
                </div>
                <h3 className="font-serif font-bold text-secondary-500 mb-2">Quality</h3>
                <p className="text-neutral-600">
                  We never compromise on ingredients or processes, ensuring every jar meets our high standards.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-primary-500" size={32} />
                </div>
                <h3 className="font-serif font-bold text-secondary-500 mb-2">Family</h3>
                <p className="text-neutral-600">
                  We treat our customers like family, sharing our love for traditional flavors.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-primary-500" size={32} />
                </div>
                <h3 className="font-serif font-bold text-secondary-500 mb-2">Tradition</h3>
                <p className="text-neutral-600">
                  We preserve time-honored recipes and methods, keeping tradition alive.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="text-primary-500" size={32} />
                </div>
                <h3 className="font-serif font-bold text-secondary-500 mb-2">Natural</h3>
                <p className="text-neutral-600">
                  We use only natural ingredients, with no artificial preservatives.
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Process Section */}
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Our Process"
              subtitle="How we craft each jar of pickle with care and attention"
              centered={true}
            />
            
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={AboutImage}
                    alt="Ingredient selection"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-serif text-2xl font-bold text-secondary-500 mb-4">
                    1. Ingredient Selection
                  </h3>
                  <p className="text-neutral-600">
                    We carefully select the freshest ingredients from trusted local suppliers. 
                    Each vegetable, spice, and oil is chosen for its quality and flavor profile.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row-reverse items-center gap-8"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={AboutImage}
                    alt="Traditional preparation"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-serif text-2xl font-bold text-secondary-500 mb-4">
                    2. Traditional Preparation
                  </h3>
                  <p className="text-neutral-600">
                    Following time-tested recipes, we prepare each batch with traditional 
                    methods. The ingredients are cut, mixed, and seasoned according to 
                    precise measurements.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={AboutImage}
                    alt="Quality control"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-serif text-2xl font-bold text-secondary-500 mb-4">
                    3. Quality Control
                  </h3>
                  <p className="text-neutral-600">
                    Each batch undergoes strict quality control checks. We ensure the 
                    perfect balance of flavors and the right texture before packaging.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;