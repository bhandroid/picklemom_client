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
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/ui/Button';
import AddPromoModal from '../../components/admin/AddPromoModal';
import { api } from '../../lib/api';
import { deletePromoCode, togglePromoCodeStatus } from '../../lib/promos';

const PromoCodesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredPromoCodes, setFilteredPromoCodes] = useState<any[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  useEffect(() => {
    // Check if user is admin
    if (user && !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    fetchPromoCodes();
  }, []);
  
  useEffect(() => {
    let result = [...promoCodes];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(promo => 
        promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (selectedStatus !== '') {
      result = result.filter(promo => promo.isActive === (selectedStatus === 'active'));
    }
    
    setFilteredPromoCodes(result);
  }, [promoCodes, searchTerm, selectedStatus]);

  const fetchPromoCodes = async () => {
    try {
      setLoading(true);
      const response = await api.getPromoCodes();
      if (response.success && response.data) {
        setPromoCodes(response.data);
      }
    } catch (error) {
      console.error('Error fetching promo codes:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteConfirm = async (promoId: string) => {
    try {
      await deletePromoCode(promoId);
      setPromoCodes(prev => prev.filter(p => p._id !== promoId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting promo code:', error);
      alert('Failed to delete promo code. Please try again.');
    }
  };

  const handleToggleStatus = async (promoId: string) => {
    try {
      const updatedPromo = await togglePromoCodeStatus(promoId);
      setPromoCodes(prev => prev.map(p => p._id === promoId ? updatedPromo : p));
    } catch (error) {
      console.error('Error toggling promo code status:', error);
      alert('Failed to toggle promo code status. Please try again.');
    }
  };

  const handleAddSuccess = () => {
    fetchPromoCodes();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };
  
  return (
    <>
      <Helmet>
        <title>Manage Promo Codes | The Pickle Mom Admin</title>
      </Helmet>
      
      <AdminLayout>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-serif font-bold text-secondary-500">
            Promo Codes
          </h1>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} className="mr-2" /> Add New Promo Code
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search promo codes..."
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
                      Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    >
                      <option value="">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedStatus('');
                    }}
                    className="flex items-center text-neutral-600 hover:text-neutral-800"
                  >
                    <X size={16} className="mr-1" /> Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Promo Codes Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <p>Loading promo codes...</p>
              </div>
            ) : filteredPromoCodes.length > 0 ? (
              <table className="w-full">
                <thead className="bg-neutral-50 text-sm text-neutral-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Code</th>
                    <th className="px-6 py-3 text-left font-medium">Type</th>
                    <th className="px-6 py-3 text-left font-medium">Value</th>
                    <th className="px-6 py-3 text-left font-medium">Usage</th>
                    <th className="px-6 py-3 text-left font-medium">Valid Until</th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                    <th className="px-6 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredPromoCodes.map((promo) => (
                    <tr key={promo._id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 font-medium text-secondary-500">
                        {promo.code}
                        {promo.description && (
                          <div className="text-xs text-neutral-500 mt-1">
                            {promo.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {promo.discountType === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {promo.discountType === 'percentage' 
                          ? `${promo.discountValue}%` 
                          : `₹${promo.discountValue}`}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {promo.usedCount} / {promo.usageLimit || '∞'}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        <span className={isExpired(promo.validUntil) ? 'text-error-500' : ''}>
                          {formatDate(promo.validUntil)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleToggleStatus(promo._id)}
                            className={`mr-2 ${promo.isActive ? 'text-success-500' : 'text-neutral-400'}`}
                            title={`Click to ${promo.isActive ? 'deactivate' : 'activate'}`}
                          >
                            {promo.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                          </button>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            promo.isActive && !isExpired(promo.validUntil)
                              ? 'bg-success-100 text-success-700'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}>
                            {promo.isActive && !isExpired(promo.validUntil) ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button 
                          className="p-1 text-neutral-500 hover:text-secondary-500"
                          title="Edit Promo Code"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-1 text-neutral-500 hover:text-error-500"
                          title="Delete Promo Code"
                          onClick={() => setDeleteConfirm(promo._id)}
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
                <p className="text-neutral-600">No promo codes found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing {filteredPromoCodes.length} of {promoCodes.length} promo codes
          </p>
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
                Are you sure you want to delete this promo code? This action cannot be undone.
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

        {/* Add Promo Code Modal */}
        <AddPromoModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      </AdminLayout>
    </>
  );
};

export default PromoCodesPage;