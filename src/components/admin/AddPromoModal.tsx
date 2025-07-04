import { useState } from 'react';
import { X } from 'lucide-react';
import { createPromoCode } from '../../lib/promos';
import Button from '../ui/Button';

interface AddPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddPromoModal: React.FC<AddPromoModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    minimumOrderAmount: '',
    maximumDiscountAmount: '',
    usageLimit: '',
    isActive: true,
    validFrom: '',
    validUntil: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.code.trim()) {
        throw new Error('Promo code is required');
      }
      
      if (!formData.discountValue || parseFloat(formData.discountValue) <= 0) {
        throw new Error('Please enter a valid discount value');
      }
      
      if (!formData.validFrom || !formData.validUntil) {
        throw new Error('Please select valid from and until dates');
      }

      if (new Date(formData.validFrom) >= new Date(formData.validUntil)) {
        throw new Error('Valid until date must be after valid from date');
      }

      const promoData = {
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim() || undefined,
        discountType: formData.discountType,
        discountValue: parseFloat(formData.discountValue),
        minimumOrderAmount: formData.minimumOrderAmount ? parseFloat(formData.minimumOrderAmount) : 0,
        maximumDiscountAmount: formData.maximumDiscountAmount ? parseFloat(formData.maximumDiscountAmount) : undefined,
        usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
        isActive: formData.isActive,
        validFrom: formData.validFrom,
        validUntil: formData.validUntil,
      };

      await createPromoCode(promoData);

      setFormData({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        minimumOrderAmount: '',
        maximumDiscountAmount: '',
        usageLimit: '',
        isActive: true,
        validFrom: '',
        validUntil: '',
      });
      
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error adding promo code:', error);
      setError(error.message || 'Failed to add promo code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-500 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-serif font-bold text-secondary-500">
            Add New Promo Code
          </h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-neutral-500 hover:text-neutral-700 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-4 bg-error-50 border border-error-200 rounded-md">
            <p className="text-error-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Promo Code *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 uppercase"
                placeholder="SAVE20"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Discount Type *
              </label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                required
                disabled={loading}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Discount Value * {formData.discountType === 'percentage' ? '(%)' : '(₹)'}
              </label>
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                step={formData.discountType === 'percentage' ? '1' : '0.01'}
                min="0"
                max={formData.discountType === 'percentage' ? '100' : undefined}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Minimum Order Amount (₹)
              </label>
              <input
                type="number"
                name="minimumOrderAmount"
                value={formData.minimumOrderAmount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                disabled={loading}
              />
            </div>

            {formData.discountType === 'percentage' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Maximum Discount Amount (₹)
                </label>
                <input
                  type="number"
                  name="maximumDiscountAmount"
                  value={formData.maximumDiscountAmount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                placeholder="Unlimited"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Valid From *
              </label>
              <input
                type="datetime-local"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Valid Until *
              </label>
              <input
                type="datetime-local"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                required
                disabled={loading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                placeholder="Optional description for the promo code"
                disabled={loading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-300 border-neutral-300 rounded"
                />
                <span className="ml-2 text-sm text-neutral-700">
                  Active
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Adding Promo Code...' : 'Add Promo Code'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPromoModal;