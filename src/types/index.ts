// Export type definition for User
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  // Ternary conditional
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  lastActive: Date;
// End block
}

// Export type definition for UserPreferences
export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
// End block
}

// Export type definition for NotificationSettings
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  frequency: "instant" | "daily" | "weekly";
// End block
}

// Export type definition for PrivacySettings
export interface PrivacySettings {
  profileVisibility: "public" | "friends" | "private";
  showEmail: boolean;
  showLastActive: boolean;
// End block
}

// Export type definition for Product
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  stock: number;
  images: string[];
  rating: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
// End block
}

// Export type definition for Review
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
// End block
}

// Export type definition for CartItem
export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
  // Ternary conditional
  customizations?: Record<string, any>;
// End block
}

// Export type definition for Order
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
// End block
}

// Export type definition for Address
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
// End block
}

// Export type definition for Notification
export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  // Ternary conditional
  expiresAt?: Date;
  // Ternary conditional
  action?: {
    label: string;
    // Define arrow function
    callback: () => void;
  // Close object/block
  };
// End block
}

// Export type definition for Filter
export interface Filter {
  // Ternary conditional
  category?: string;
  // Ternary conditional
  priceRange?: [number, number];
  // Ternary conditional
  rating?: number;
  // Ternary conditional
  tags?: string[];
  // Ternary conditional
  inStock?: boolean;
  // Ternary conditional
  searchQuery?: string;
// End block
}

// Export type definition for SortOption
export interface SortOption {
  field: "name" | "price" | "rating" | "createdAt";
  direction: "asc" | "desc";
// End block
}

// Export type definition for PaginationState
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
// End block
}

// Export type definition for LoadingState
export interface LoadingState {
  [key: string]: boolean;
// End block
}

// Export type definition for ErrorState
export interface ErrorState {
  [key: string]: string | null;
// End block
}

// Export type definition for AsyncAction<T>
export interface AsyncAction<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  timestamp: number | null;
// End block
}

// Export type definition for WebSocketMessage
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: Date;
// End block
}

// Export type definition for Analytics
export interface Analytics {
  pageViews: number;
  uniqueVisitors: Set<string>;
  events: AnalyticsEvent[];
  sessionStart: Date;
  sessionDuration: number;
// End block
}

// Export type definition for AnalyticsEvent
export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: Date;
// End block
}

// Export type definition for Theme
export type Theme = "light" | "dark" | "auto";
// Export type definition for Toast
export type Toast = Notification;
// Export type definition for Modal
export type Modal = string;
// Export type definition for PageView
export type PageView = {
  path: string;
  timestamp: Date;
  // Ternary conditional
  duration?: number;
// Close object/block
};
// Export type definition for UserProfile
export type UserProfile = Omit<User, "preferences"> & {
  // Ternary conditional
  bio?: string;
  // Ternary conditional
  website?: string;
  // Ternary conditional
  socialLinks?: Record<string, string>;
// Close object/block
};