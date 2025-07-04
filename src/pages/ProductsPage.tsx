import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, SlidersHorizontal, AlertCircle, RefreshCw } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';
import { useProducts } from '../hooks/useProducts';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductsPage = () => {
  const { products, loading, error, retry } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory]);

  if (error) {
    return (
      <>
        <Helmet>
          <title>Shop All Pickles | The Pickle Mom</title>
          <meta 
            name="description" 
            content="Browse our collection of handcrafted, artisanal pickles. Find your favorite flavors or try something new." 
          />
        </Helmet>
        
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Our Pickle Collection"
              subtitle="Browse our handcrafted, small-batch pickles made with traditional recipes and the freshest ingredients."
            />
            
            <div className="text-center py-12">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="text-error-500 mr-2" size={24} />
                <p className="text-error-500 font-medium">Failed to load products</p>
              </div>
              <p className="text-neutral-600 mb-6">{error}</p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="primary" 
                  onClick={retry}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                >
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Shop All Pickles | The Pickle Mom</title>
        <meta 
          name="description" 
          content="Browse our collection of handcrafted, artisanal pickles. Find your favorite flavors or try something new." 
        />
      </Helmet>
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Pickle Collection"
            subtitle="Browse our handcrafted, small-batch pickles made with traditional recipes and the freshest ingredients."
          />
          
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search pickles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
                <Search className="absolute left-3 top-3.5 text-neutral-400" size={18} />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-md"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="mb-4">
                <h3 className="font-medium text-secondary-500 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        (category === 'All' && !selectedCategory) || category === selectedCategory
                          ? 'bg-primary-500 text-secondary-500'
                          : 'bg-neutral-100 text-secondary-500 hover:bg-neutral-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <LoadingSpinner />
              <p className="text-neutral-600 mt-4">Loading delicious pickles...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-600 mb-6">
                No products available at the moment.
              </p>
              <Button 
                variant="primary" 
                onClick={retry}
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh Page
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-600">
                No products found matching your criteria. Try a different search or filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;