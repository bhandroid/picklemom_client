// User types
export interface User {
  _id: string;
  email: string;
  fullName?: string;
  phone?: string;
  address?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

// Product types
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: ProductCategory;
  stock?: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 'Non-Veg Pickles' | 'Veg Pickles' | 'Podulu' | 'Snacks';

// Cart types
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

// Order types
export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Auth types
export interface AuthResponse {
  user: User;
  token: string;
}