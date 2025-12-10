// Import specific exports from zustand
import { StateCreator } from "zustand";
// Import statement
import {
  Product,
  CartItem,
  Order,
  Filter,
  SortOption,
  PaginationState,
} from "../../types";

// Export type definition for ProductSlice
export interface ProductSlice {
  products: Map<string, Product>;
  cart: CartItem[];
  orders: Order[];
  wishlist: Set<string>;
  filters: Filter;
  sort: SortOption;
  pagination: PaginationState;
  selectedProduct: Product | null;
  recentlyViewed: string[];
  compareList: string[];

  // Define arrow function
  fetchProducts: (page?: number) => Promise<void>;
  // Define arrow function
  fetchProductById: (id: string) => Promise<Product | null>;
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  // Define arrow function
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  // Define arrow function
  deleteProduct: (id: string) => Promise<void>;

  addToCart: (
    productId: string,
    // Ternary conditional
    quantity?: number,
    // Ternary conditional
    customizations?: Record<string, any>
  ) => void;
  // Define arrow function
  removeFromCart: (productId: string) => void;
  // Define arrow function
  updateCartQuantity: (productId: string, quantity: number) => void;
  // Define arrow function
  clearCart: () => void;
  // Define arrow function
  getCartTotal: () => number;
  // Define arrow function
  getCartItemCount: () => number;

  // Define arrow function
  createOrder: () => Promise<void>;
  // Define arrow function
  fetchOrders: () => Promise<void>;
  // Define arrow function
  cancelOrder: (orderId: string) => Promise<void>;

  // Define arrow function
  addToWishlist: (productId: string) => void;
  // Define arrow function
  removeFromWishlist: (productId: string) => void;
  // Define arrow function
  isInWishlist: (productId: string) => boolean;

  // Define arrow function
  setFilters: (filters: Partial<Filter>) => void;
  // Define arrow function
  clearFilters: () => void;
  // Define arrow function
  setSort: (sort: SortOption) => void;
  // Define arrow function
  setPagination: (pagination: Partial<PaginationState>) => void;

  // Define arrow function
  selectProduct: (product: Product | null) => void;
  // Define arrow function
  addToRecentlyViewed: (productId: string) => void;
  // Define arrow function
  addToCompare: (productId: string) => void;
  // Define arrow function
  removeFromCompare: (productId: string) => void;
  // Define arrow function
  clearCompare: () => void;

  addReview: (
    productId: string,
    rating: number,
    comment: string
  ) => Promise<void>;
  // Define arrow function
  markReviewHelpful: (productId: string, reviewId: string) => void;

  // Define arrow function
  getFilteredProducts: () => Product[];
  // Define arrow function
  getProductsByCategory: (category: string) => Product[];
  // Define arrow function
  getTopRatedProducts: (limit: number) => Product[];
  // Define arrow function
  getNewArrivals: (limit: number) => Product[];
  // End block
}

// Export constant createProductSlice:
export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
  products: new Map(),
  cart: [],
  orders: [],
  wishlist: new Set(),
  filters: {},
  sort: { field: "createdAt", direction: "desc" },
  pagination: { page: 1, pageSize: 20, total: 0 },
  selectedProduct: null,
  recentlyViewed: [],
  compareList: [],

  // Define async function
  fetchProducts: async (page = 1) => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Declare variable mockProducts
      const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
        id: `prod-${i + 1}`,
        name: `Product ${i + 1}`,
        description: `This is a detailed description for product ${
          i + 1
        }. It features high quality materials and exceptional craftsmanship.`,
        price: Math.floor(Math.random() * 500) + 10,
        category: ["Electronics", "Clothing", "Home", "Books", "Sports"][i % 5],
        // Filter array elements
        tags: ["popular", "new", "sale", "featured"].filter(
          // Define arrow function
          () => Math.random() > 0.6
        ),
        stock: Math.floor(Math.random() * 100),
        images: [
          `https://picsum.photos/400/400?random=${i * 3}`,
          `https://picsum.photos/400/400?random=${i * 3 + 1}`,
          `https://picsum.photos/400/400?random=${i * 3 + 2}`,
        ],
        rating: Math.floor(Math.random() * 5) + 1,
        reviews: [],
        createdAt: new Date(
          Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
        ),
        updatedAt: new Date(),
      }));

      // Declare variable productsMap
      const productsMap = new Map(mockProducts.map((p) => [p.id, p]));

      // Update store state
      set({
        products: productsMap,
        pagination: { ...get().pagination, page, total: mockProducts.length },
        // Close object/block
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // End block
    }
  },

  // Define async function
  fetchProductById: async (id: string) => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Declare variable product
      const product = get().products.get(id);
      // Conditional statement
      if (product) {
        // Update store state
        set({ selectedProduct: product });
        // Get current store state
        get().addToRecentlyViewed(id);
        // End block
      }
      // Return value from function
      return product || null;
    } catch (error) {
      console.error("Failed to fetch product:", error);
      // Return value from function
      return null;
      // End block
    }
  },

  // Define async function
  addProduct: async (productData) => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Declare variable newProduct
      const newProduct: Product = {
        ...productData,
        // Generate unique ID using template literal with timestamp
        id: `prod-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Close object/block
      };

      // Define arrow function
      set((state) => {
        // Declare variable newProducts
        const newProducts = new Map(state.products);
        newProducts.set(newProduct.id, newProduct);
        // Return value from function
        return { products: newProducts };
        // Close object/block
      });
    } catch (error) {
      console.error("Failed to add product:", error);
      // Throw error
      throw error;
      // End block
    }
  },

  // Define async function
  updateProduct: async (id: string, updates: Partial<Product>) => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Define arrow function
      set((state) => {
        // Declare variable newProducts
        const newProducts = new Map(state.products);
        // Declare variable product
        const product = newProducts.get(id);
        // Conditional statement
        if (product) {
          newProducts.set(id, {
            ...product,
            ...updates,
            updatedAt: new Date(),
            // Close object/block
          });
          // End block
        }
        // Return value from function
        return { products: newProducts };
        // Close object/block
      });
    } catch (error) {
      console.error("Failed to update product:", error);
      // Throw error
      throw error;
      // End block
    }
  },

  // Define async function
  deleteProduct: async (id: string) => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Define arrow function
      set((state) => {
        // Declare variable newProducts
        const newProducts = new Map(state.products);
        newProducts.delete(id);
        // Return value from function
        return { products: newProducts };
        // Close object/block
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      // Throw error
      throw error;
      // End block
    }
  },

  // Define arrow function
  addToCart: (productId: string, quantity = 1, customizations = {}) => {
    // Define arrow function
    set((state) => {
      // Declare variable existingItem
      const existingItem = state.cart.find(
        // Define arrow function
        (item) => item.productId === productId
      );

      // Conditional statement
      if (existingItem) {
        // Return value from function
        return {
          // Define arrow function
          cart: state.cart.map((item) =>
            item.productId === productId
              ? // Ternary conditional
                { ...item, quantity: item.quantity + quantity }
              : item
          ),
          // Close object/block
        };
        // End block
      }

      // Return value from function
      return {
        cart: [
          ...state.cart,
          // Begin block
          {
            productId,
            quantity,
            addedAt: new Date(),
            customizations:
              Object.keys(customizations).length > 0
                ? customizations
                : undefined,
          },
        ],
        // Close object/block
      };
      // Close object/block
    });
  },

  // Define arrow function
  removeFromCart: (productId: string) => {
    // Define arrow function
    set((state) => ({
      // Define arrow function
      cart: state.cart.filter((item) => item.productId !== productId),
    }));
  },

  // Define arrow function
  updateCartQuantity: (productId: string, quantity: number) => {
    // Define arrow function
    set((state) => ({
      // Define arrow function
      cart: state.cart.map((item) =>
        // Ternary conditional
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },

  // Define arrow function
  clearCart: () => {
    // Update store state
    set({ cart: [] });
  },

  // Define arrow function
  getCartTotal: () => {
    // Declare variable {
    const { cart, products } = get();
    // Return value from function
    return cart.reduce((total, item) => {
      // Declare variable product
      const product = products.get(item.productId);
      // Return value from function
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  // Define arrow function
  getCartItemCount: () => {
    // Return value from function
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Define async function
  createOrder: async () => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Declare variable {
      const { cart } = get();
      // Declare variable newOrder
      const newOrder: Order = {
        // Generate unique order ID using template literal with timestamp
        id: `order-${Date.now()}`,
        userId: "current-user-id",
        items: [...cart],
        total: get().getCartTotal(),
        status: "pending",
        shippingAddress: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          country: "USA",
          zipCode: "12345",
        },
        paymentMethod: "credit_card",
        createdAt: new Date(),
        updatedAt: new Date(),
        // Close object/block
      };

      // Define arrow function
      set((state) => ({
        orders: [...state.orders, newOrder],
        cart: [],
      }));
    } catch (error) {
      console.error("Failed to create order:", error);
      // Throw error
      throw error;
      // End block
    }
  },

  // Define async function
  fetchOrders: async () => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      // End block
    }
  },

  // Define async function
  cancelOrder: async (orderId: string) => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Define arrow function
      set((state) => ({
        // Define arrow function
        orders: state.orders.map((order) =>
          order.id === orderId
            ? // Ternary conditional
              { ...order, status: "cancelled", updatedAt: new Date() }
            : order
        ),
      }));
    } catch (error) {
      console.error("Failed to cancel order:", error);
      // Throw error
      throw error;
      // End block
    }
  },

  // Define arrow function
  addToWishlist: (productId: string) => {
    // Define arrow function
    set((state) => {
      // Declare variable newWishlist
      const newWishlist = new Set(state.wishlist);
      newWishlist.add(productId);
      // Return value from function
      return { wishlist: newWishlist };
      // Close object/block
    });
  },

  // Define arrow function
  removeFromWishlist: (productId: string) => {
    // Define arrow function
    set((state) => {
      // Declare variable newWishlist
      const newWishlist = new Set(state.wishlist);
      newWishlist.delete(productId);
      // Return value from function
      return { wishlist: newWishlist };
      // Close object/block
    });
  },

  // Define arrow function
  isInWishlist: (productId: string) => {
    // Return value from function
    return get().wishlist.has(productId);
  },

  // Define arrow function
  setFilters: (filters: Partial<Filter>) => {
    // Define arrow function
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 },
    }));
  },

  // Define arrow function
  clearFilters: () => {
    // Update store state
    set({ filters: {}, pagination: { ...get().pagination, page: 1 } });
  },

  // Define arrow function
  setSort: (sort: SortOption) => {
    // Update store state
    set({ sort, pagination: { ...get().pagination, page: 1 } });
  },

  // Define arrow function
  setPagination: (pagination: Partial<PaginationState>) => {
    // Define arrow function
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    }));
  },

  // Define arrow function
  selectProduct: (product: Product | null) => {
    // Update store state
    set({ selectedProduct: product });
  },

  // Define arrow function
  addToRecentlyViewed: (productId: string) => {
    // Define arrow function
    set((state) => {
      // Declare variable filtered
      const filtered = state.recentlyViewed.filter((id) => id !== productId);
      // Return value from function
      return {
        recentlyViewed: [productId, ...filtered].slice(0, 10),
        // Close object/block
      };
      // Close object/block
    });
  },

  // Define arrow function
  addToCompare: (productId: string) => {
    // Define arrow function
    set((state) => {
      // Conditional statement
      if (
        state.compareList.includes(productId) ||
        state.compareList.length >= 4
      ) {
        // Return value from function
        return state;
        // End block
      }
      // Return value from function
      return {
        compareList: [...state.compareList, productId],
        // Close object/block
      };
      // Close object/block
    });
  },

  // Define arrow function
  removeFromCompare: (productId: string) => {
    // Define arrow function
    set((state) => ({
      // Define arrow function
      compareList: state.compareList.filter((id) => id !== productId),
    }));
  },

  // Define arrow function
  clearCompare: () => {
    // Update store state
    set({ compareList: [] });
  },

  // Define async function
  addReview: async (productId: string, rating: number, comment: string) => {
    // Begin try-catch block
    try {
      // Define arrow function
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Declare variable newReview
      const newReview = {
        // Generate unique review ID using template literal with timestamp
        id: `review-${Date.now()}`,
        userId: "current-user-id",
        userName: "Current User",
        rating,
        comment,
        createdAt: new Date(),
        helpful: 0,
        // Close object/block
      };

      // Define arrow function
      set((state) => {
        // Declare variable newProducts
        const newProducts = new Map(state.products);
        // Declare variable product
        const product = newProducts.get(productId);
        // Conditional statement
        if (product) {
          // Declare variable updatedProduct
          const updatedProduct = {
            ...product,
            reviews: [...product.reviews, newReview],
            rating:
              (product.rating * product.reviews.length + rating) /
              (product.reviews.length + 1),
            // Close object/block
          };
          newProducts.set(productId, updatedProduct);
          // End block
        }
        // Return value from function
        return { products: newProducts };
        // Close object/block
      });
    } catch (error) {
      console.error("Failed to add review:", error);
      // Throw error
      throw error;
      // End block
    }
  },

  // Define arrow function
  markReviewHelpful: (productId: string, reviewId: string) => {
    // Define arrow function
    set((state) => {
      // Declare variable newProducts
      const newProducts = new Map(state.products);
      // Declare variable product
      const product = newProducts.get(productId);
      // Conditional statement
      if (product) {
        // Declare variable updatedProduct
        const updatedProduct = {
          ...product,
          // Define arrow function
          reviews: product.reviews.map((review) =>
            review.id === reviewId
              ? // Ternary conditional
                { ...review, helpful: review.helpful + 1 }
              : review
          ),
          // Close object/block
        };
        newProducts.set(productId, updatedProduct);
        // End block
      }
      // Return value from function
      return { products: newProducts };
      // Close object/block
    });
  },

  // Define arrow function
  getFilteredProducts: () => {
    // Declare variable {
    const { products, filters, sort } = get();
    // Declare variable filtered
    let filtered = Array.from(products.values());

    // Conditional statement
    if (filters.category) {
      // Define arrow function
      filtered = filtered.filter((p) => p.category === filters.category);
      // End block
    }
    // Conditional statement
    if (filters.priceRange) {
      // Declare variable [min,
      const [min, max] = filters.priceRange;
      // Define arrow function
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
      // End block
    }
    // Conditional statement
    if (filters.rating) {
      // Define arrow function
      filtered = filtered.filter((p) => p.rating >= filters.rating!);
      // End block
    }
    // Conditional statement
    if (filters.tags && filters.tags.length > 0) {
      // Define arrow function
      filtered = filtered.filter((p) =>
        // Define arrow function
        filters.tags!.some((tag) => p.tags.includes(tag))
      );
      // End block
    }
    // Conditional statement
    if (filters.inStock) {
      // Define arrow function
      filtered = filtered.filter((p) => p.stock > 0);
      // End block
    }
    // Conditional statement
    if (filters.searchQuery) {
      // Declare variable query
      const query = filters.searchQuery.toLowerCase();
      // Filter array elements
      filtered = filtered.filter(
        // Define arrow function
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          // Define arrow function
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
      // End block
    }

    // Define arrow function
    filtered.sort((a, b) => {
      // Declare variable aVal
      const aVal = a[sort.field];
      // Declare variable bVal
      const bVal = b[sort.field];
      // Declare variable multiplier
      const multiplier = sort.direction === "asc" ? 1 : -1;

      // Conditional statement
      if (aVal instanceof Date && bVal instanceof Date) {
        // Return value from function
        return (aVal.getTime() - bVal.getTime()) * multiplier;
        // End block
      }

      // Conditional statement
      if (typeof aVal === "number" && typeof bVal === "number") {
        // Return value from function
        return (aVal - bVal) * multiplier;
        // End block
      }

      // Return value from function
      return String(aVal).localeCompare(String(bVal)) * multiplier;
      // Close object/block
    });

    // Return value from function
    return filtered;
  },

  // Define arrow function
  getProductsByCategory: (category: string) => {
    // Return value from function
    return Array.from(get().products.values()).filter(
      // Define arrow function
      (p) => p.category === category
    );
  },

  // Define arrow function
  getTopRatedProducts: (limit: number) => {
    // Return value from function
    return (
      Array.from(get().products.values())
        // Define arrow function
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit)
    );
  },

  // Define arrow function
  getNewArrivals: (limit: number) => {
    // Return value from function
    return (
      Array.from(get().products.values())
        // Define arrow function
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit)
    );
  },
  // Close object/block
});
