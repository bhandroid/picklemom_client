import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  X,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/ui/Button';
import { useProducts } from '../../hooks/useProducts';
import AddProductModal from '../../components/admin/AddProductModal';
import EditProductModal from '../../components/admin/EditProductModal';
import { deleteProduct } from '../../lib/products';

const ProductsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Extract unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    // Check if user is admin
    if (user && !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory]);
  
  const handleDeleteConfirm = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setFilteredProducts(prev => prev.filter(p => p.id !== productId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleAddSuccess = () => {
    window.location.reload();
  };

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleViewClick = (productId: string) => {
    window.open(`/products/${productId}`, '_blank');
  };
  
  return (
    <>
      <Helmet>
        <title>Manage Products | The Pickle Mom Admin</title>
      </Helmet>
      
      <AdminLayout>
        <div className="flex flex-wrap items-center justify-end gap-4 mb-6">
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} className="mr-2" /> Add New Product
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
                <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-300 rounded-md md:w-auto"
              >
                <Filter size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category === 'All' ? '' : category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="flex items-center text-neutral-600 hover:text-neutral-800"
                  >
                    <X size={16} className="mr-1" /> Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Products Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <table className="w-full">
                <thead className="bg-neutral-50 text-sm text-neutral-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Image</th>
                    <th className="px-6 py-3 text-left font-medium">Name</th>
                    <th className="px-6 py-3 text-left font-medium">Category</th>
                    <th className="px-6 py-3 text-left font-medium">Price</th>
                    <th className="px-6 py-3 text-left font-medium">Stock</th>
                    <th className="px-6 py-3 text-left font-medium">Featured</th>
                    <th className="px-6 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-secondary-500">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        ₹{product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          product.stock > 20 
                            ? 'bg-success-100 text-success-700'
                            : product.stock > 10
                            ? 'bg-warning-100 text-warning-700'
                            : 'bg-error-100 text-error-700'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {product.featured ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button 
                          className="p-1 text-neutral-500 hover:text-primary-500"
                          title="View Product"
                          onClick={() => handleViewClick(product.id)}
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="p-1 text-neutral-500 hover:text-secondary-500"
                          title="Edit Product"
                          onClick={() => handleEditClick(product)}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-1 text-neutral-500 hover:text-error-500"
                          title="Delete Product"
                          onClick={() => setDeleteConfirm(product.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center">
                <p className="text-neutral-600">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-neutral-300 rounded-md text-neutral-600 hover:bg-neutral-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary-500 text-secondary-500 rounded-md">
              1
            </button>
            <button className="px-3 py-1 border border-neutral-300 rounded-md text-neutral-600 hover:bg-neutral-50">
              Next
            </button>
          </div>
        </div>
        
        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-500 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <div className="flex items-center text-error-500 mb-4">
                <AlertCircle size={24} className="mr-2" />
                <h3 className="text-lg font-medium">Confirm Deletion</h3>
              </div>
              
              <p className="mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteConfirm && handleDeleteConfirm(deleteConfirm)}
                  className="px-4 py-2 bg-error-500 text-white rounded-md hover:bg-error-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        <AddProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />

        {/* Edit Product Modal */}
        {selectedProduct && (
          <EditProductModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
            onSuccess={() => {
              setShowEditModal(false);
              setSelectedProduct(null);
              window.location.reload();
            }}
            product={selectedProduct}
          />
        )}
      </AdminLayout>
    </>
  );
};

export default ProductsPage;