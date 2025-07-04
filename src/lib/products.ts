import { api } from './api';

export type ProductCategory = 'Non-Veg Pickles' | 'Veg Pickles' | 'Podulu' | 'Snacks';

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: ProductCategory;
  stock: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: ProductCategory;
  stock: number;
  featured: boolean;
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export const createProduct = async (productData: CreateProductData): Promise<Product> => {
  const response = await api.createProduct(productData);
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.message || 'Failed to create product');
};

export const updateProduct = async (id: string, productData: UpdateProductData): Promise<Product> => {
  const response = await api.updateProduct(id, productData);
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.message || 'Failed to update product');
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await api.deleteProduct(id);
  if (!response.success) {
    throw new Error(response.message || 'Failed to delete product');
  }
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.getProducts();
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.message || 'Failed to fetch products');
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.getProduct(id);
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.message || 'Failed to fetch product');
};