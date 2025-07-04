import { useState, useEffect } from 'react';
import { api } from '../lib/api';

// Simple Product interface for this hook
interface Product {
  _id: string;
  id: string; // Add computed id field for compatibility
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching products from MongoDB...');
      const response = await api.getProducts();
      
      if (response.success && response.data) {
        // Transform products to include id field for compatibility
        const transformedProducts = response.data.map(product => ({
          ...product,
          id: product._id, // Add id field for compatibility with existing components
        }));
        setProducts(transformedProducts);
        console.log('✅ Products fetched successfully:', transformedProducts.length);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const retry = () => {
    fetchProducts();
  };

  return { products, loading, error, retry, refetch: fetchProducts };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching product by ID:', id);
        const response = await api.getProduct(id);
        
        if (response.success && response.data) {
          const transformedProduct = {
            ...response.data,
            id: response.data._id, // Add id field for compatibility
          };
          setProduct(transformedProduct);
          console.log('✅ Product fetched successfully:', transformedProduct.name);
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        console.error('❌ Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}