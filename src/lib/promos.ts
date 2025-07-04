import { api } from './api';

export interface PromoCode {
  _id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumOrderAmount: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePromoCodeData {
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  isActive?: boolean;
  validFrom: string;
  validUntil: string;
}

export interface PromoValidationResult {
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  finalAmount: number;
}

export const validatePromoCode = async (code: string, orderAmount: number): Promise<PromoValidationResult> => {
  const response = await api.validatePromoCode(code, orderAmount);
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.message || 'Invalid promo code');
};

export const createPromoCode = async (promoData: CreatePromoCodeData): Promise<PromoCode> => {
  const response = await api.createPromoCode(promoData);
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.message || 'Failed to create promo code');
};

export const updatePromoCode = async (id: string, promoData: Partial<CreatePromoCodeData>): Promise<PromoCode> => {
  const response = await api.updatePromoCode(id, promoData);
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.message || 'Failed to update promo code');
};

export const deletePromoCode = async (id: string): Promise<void> => {
  const response = await api.deletePromoCode(id);
  if (!response.success) {
    throw new Error(response.message || 'Failed to delete promo code');
  }
};

export const togglePromoCodeStatus = async (id: string): Promise<PromoCode> => {
  const response = await api.togglePromoCodeStatus(id);
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.message || 'Failed to toggle promo code status');
};