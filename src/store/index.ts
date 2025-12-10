// Import the create function from zustand library to build the store
// Import specific exports from zustand
import { create } from "zustand";
// Import devtools middleware for Redux DevTools integration
// Import persist middleware for localStorage synchronization
// Import specific exports from zustand/middleware
import { devtools, persist } from "zustand/middleware";
// Import immer middleware for immutable state updates using mutable syntax
// Import specific exports from zustand/middleware/immer
import { immer } from "zustand/middleware/immer";
// Import user slice creator and type definition for user-related state
// Import specific exports from ./slices/userSlice
import { createUserSlice, UserSlice } from "./slices/userSlice";
// Import product slice creator and type definition for product-related state
// Import specific exports from ./slices/productSlice
import { createProductSlice, ProductSlice } from "./slices/productSlice";
// Import notification slice creator and type definition for notifications state
// Import statement
import {
  createNotificationSlice,
  NotificationSlice,
} from "./slices/notificationSlice";
// Import UI slice creator and type definition for UI state management
// Import specific exports from ./slices/uiSlice
import { createUISlice, UISlice } from "./slices/uiSlice";
// Import WebSocket and Analytics slice creators and types for real-time features
// Import statement
import {
  createWebSocketSlice,
  WebSocketSlice,
  createAnalyticsSlice,
  AnalyticsSlice,
} from "./slices/miscSlices";

// Define the combined application store type by intersecting all slice types
// Export type definition for AppStore
export type AppStore = UserSlice &
  ProductSlice &
  NotificationSlice &
  UISlice &
  WebSocketSlice &
  AnalyticsSlice;

// Create the main zustand store with all middleware and slices combined
// Export constant useStore
export const useStore = create<AppStore>()(
  // Wrap with devtools middleware for debugging in browser extensions
  devtools(
    // Wrap with persist middleware to save state to localStorage
    persist(
      // Wrap with immer middleware to enable immutable state updates
      // Define arrow function
      immer((set, get, store) => ({
        // Spread all user slice state and actions into the store
        ...createUserSlice(set as any, get, store as any),
        // Spread all product slice state and actions into the store
        ...createProductSlice(set as any, get, store as any),
        // Spread all notification slice state and actions into the store
        ...createNotificationSlice(set as any, get, store as any),
        // Spread all UI slice state and actions into the store
        ...createUISlice(set as any, get, store as any),
        // Spread all WebSocket slice state and actions into the store
        ...createWebSocketSlice(set as any, get, store as any),
        // Spread all analytics slice state and actions into the store
        ...createAnalyticsSlice(set as any, get, store as any),
      })),
      // Begin block
      {
        // Set the localStorage key name for persisted state
        name: "app-storage",
        // Define which parts of state should be persisted to localStorage
        // Define arrow function
        partialize: (state) => ({
          // Persist the current logged-in user object
          currentUser: state.currentUser,
          // Persist the authentication status boolean
          isAuthenticated: state.isAuthenticated,
          // Persist the user's theme preference
          theme: state.theme,
          // Persist the shopping cart items array
          cart: state.cart,
          // Convert Set to Array for JSON serialization since Sets aren't JSON-compatible
          wishlist: Array.from(state.wishlist),
          // Persist the recently viewed products array
          recentlyViewed: state.recentlyViewed,
        }),
        // Custom storage implementation for handling complex types like Set
        storage: {
          // Custom getter to retrieve and deserialize state from localStorage
          // Define arrow function
          getItem: (name) => {
            // Retrieve the JSON string from localStorage
            // Declare variable str
            const str = localStorage.getItem(name);
            // Return null if nothing was stored
            // Conditional statement
            if (!str) return null;
            // Parse the JSON string to extract the state object
            // Declare variable {
            const { state } = JSON.parse(str);

            // Check if wishlist exists and is stored as an array
            // Conditional statement
            if (state.wishlist && Array.isArray(state.wishlist)) {
              // Convert the array back to a Set for runtime use
              state.wishlist = new Set(state.wishlist);
              // End block
            }
            // Return the rehydrated state object
            // Return value from function
            return { state };
          },
          // Custom setter to serialize state to localStorage
          // Define arrow function
          setItem: (name, value) => {
            // Convert value to JSON string and save to localStorage
            localStorage.setItem(name, JSON.stringify(value));
          },
          // Custom remover to delete state from localStorage
          // Define arrow function
          removeItem: (name) => {
            // Remove the item from localStorage by key name
            localStorage.removeItem(name);
          },
        },
        // End block
      }
    ),
    // Configure devtools with a display name for the store
    { name: "AppStore" }
  )
);

// Selector hook to extract the current user from store state
// Export constant useCurrentUser
export const useCurrentUser = () => useStore((state) => state.currentUser);
// Selector hook to extract the authentication status boolean
// Export constant useIsAuthenticated
export const useIsAuthenticated = () =>
  // Define arrow function
  useStore((state) => state.isAuthenticated);
// Selector hook to extract the current user's preferences
// Export constant useUserPreferences
export const useUserPreferences = () =>
  // Define arrow function
  useStore((state) => state.currentUser?.preferences);

// Selector hook to extract the products Map from store
// Export constant useProducts
export const useProducts = () => useStore((state) => state.products);
// Selector hook to extract the shopping cart items array
// Export constant useCart
export const useCart = () => useStore((state) => state.cart);
// Selector hook to extract the computed cart total price
// Export constant useCartTotal
export const useCartTotal = () => useStore((state) => state.getCartTotal());
// Selector hook to extract the computed total number of items in cart
// Export constant useCartItemCount
export const useCartItemCount = () =>
  // Define arrow function
  useStore((state) => state.getCartItemCount());
// Selector hook to extract the wishlist Set
// Export constant useWishlist
export const useWishlist = () => useStore((state) => state.wishlist);
// Selector hook to extract the currently selected product
// Export constant useSelectedProduct
export const useSelectedProduct = () =>
  // Define arrow function
  useStore((state) => state.selectedProduct);

// Selector hook to extract filters state
// Export constant useFilters
export const useFilters = () => useStore((state) => state.filters);

// Selector hook to extract sort state
// Export constant useSort
export const useSort = () => useStore((state) => state.sort);

// Selector hook to extract filtered products based on current filters and sort
// Export constant useFilteredProducts
export const useFilteredProducts = () => {
  const products = useProducts();
  const filters = useFilters();
  const sort = useSort();

  let filtered = Array.from(products.values());

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter((p) => p.price >= min && p.price <= max);
  }
  if (filters.rating) {
    filtered = filtered.filter((p) => p.rating >= filters.rating!);
  }
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((p) =>
      filters.tags!.some((tag) => p.tags.includes(tag))
    );
  }
  if (filters.inStock) {
    filtered = filtered.filter((p) => p.stock > 0);
  }
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  filtered.sort((a, b) => {
    const aVal = a[sort.field];
    const bVal = b[sort.field];
    const multiplier = sort.direction === "asc" ? 1 : -1;

    if (aVal instanceof Date && bVal instanceof Date) {
      return (aVal.getTime() - bVal.getTime()) * multiplier;
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * multiplier;
    }

    return String(aVal).localeCompare(String(bVal)) * multiplier;
  });

  return filtered;
};

// Selector hook to extract the notifications array
// Export constant useNotifications
export const useNotifications = () => useStore((state) => state.notifications);
// Selector hook to extract the count of unread notifications
// Export constant useUnreadCount
export const useUnreadCount = () => useStore((state) => state.unreadCount);
// Selector hook to extract the toast messages array
// Export constant useToasts
export const useToasts = () => useStore((state) => state.toasts);

// Selector hook to extract the current theme setting
// Export constant useTheme
export const useTheme = () => useStore((state) => state.theme);
// Selector hook to extract the sidebar open/closed state
// Export constant useSidebarOpen
export const useSidebarOpen = () => useStore((state) => state.sidebarOpen);
// Selector hook to extract the modal stack array
// Export constant useModalStack
export const useModalStack = () => useStore((state) => state.modalStack);
// Selector hook to extract a specific loading state by key
// Export constant useLoading
export const useLoading = (key: string) =>
  // Define arrow function
  useStore((state) => state.loading[key] || false);
// Selector hook to extract a specific error message by key
// Export constant useError
export const useError = (key: string) =>
  // Define arrow function
  useStore((state) => state.errors[key] || null);

// Selector hook to extract the WebSocket connection status
// Export constant useWSConnected
export const useWSConnected = () => useStore((state) => state.connected);
// Selector hook to extract the WebSocket messages array
// Export constant useWSMessages
export const useWSMessages = () => useStore((state) => state.messages);

// Selector hook to extract the analytics data object
// Export constant useAnalytics
export const useAnalytics = () => useStore((state) => state.analytics);

// Action hook to extract all user-related actions in a stable object
// Export constant useUserActions
export const useUserActions = () => {
  // Extract the login action function from store
  // Declare variable login
  const login = useStore((state) => state.login);
  // Extract the logout action function from store
  // Declare variable logout
  const logout = useStore((state) => state.logout);
  // Extract the register action function from store
  // Declare variable register
  const register = useStore((state) => state.register);
  // Extract the updateUser action function from store
  // Declare variable updateUser
  const updateUser = useStore((state) => state.updateUser);
  // Extract the updatePreferences action function from store
  // Declare variable updatePreferences
  const updatePreferences = useStore((state) => state.updatePreferences);

  // Return all user actions in a single object
  // Return value from function
  return { login, logout, register, updateUser, updatePreferences };
  // Close object/block
};

// Export constant useProductActions
export const useProductActions = () => {
  // Declare variable fetchProducts
  const fetchProducts = useStore((state) => state.fetchProducts);
  // Declare variable addToCart
  const addToCart = useStore((state) => state.addToCart);
  // Declare variable removeFromCart
  const removeFromCart = useStore((state) => state.removeFromCart);
  // Declare variable updateCartQuantity
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  // Declare variable clearCart
  const clearCart = useStore((state) => state.clearCart);
  // Declare variable addToWishlist
  const addToWishlist = useStore((state) => state.addToWishlist);
  // Declare variable removeFromWishlist
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  // Declare variable isInWishlist
  const isInWishlist = useStore((state) => state.isInWishlist);
  // Declare variable setFilters
  const setFilters = useStore((state) => state.setFilters);
  // Declare variable setSort
  const setSort = useStore((state) => state.setSort);
  // Declare variable createOrder
  const createOrder = useStore((state) => state.createOrder);

  // Return value from function
  return {
    fetchProducts,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setFilters,
    setSort,
    createOrder,
    // Close object/block
  };
  // Close object/block
};

// Export constant useNotificationActions
export const useNotificationActions = () => {
  // Declare variable addNotification
  const addNotification = useStore((state) => state.addNotification);
  // Declare variable markAsRead
  const markAsRead = useStore((state) => state.markAsRead);
  // Declare variable showToast
  const showToast = useStore((state) => state.showToast);
  // Declare variable dismissToast
  const dismissToast = useStore((state) => state.dismissToast);

  // Return value from function
  return { addNotification, markAsRead, showToast, dismissToast };
  // Close object/block
};

// Export constant useUIActions
export const useUIActions = () => {
  // Declare variable setTheme
  const setTheme = useStore((state) => state.setTheme);
  // Declare variable toggleSidebar
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  // Declare variable openModal
  const openModal = useStore((state) => state.openModal);
  // Declare variable closeModal
  const closeModal = useStore((state) => state.closeModal);
  // Declare variable setLoading
  const setLoading = useStore((state) => state.setLoading);
  // Declare variable setError
  const setError = useStore((state) => state.setError);
  // Declare variable setOnlineStatus
  const setOnlineStatus = useStore((state) => state.setOnlineStatus);

  // Return value from function
  return {
    setTheme,
    toggleSidebar,
    openModal,
    closeModal,
    setLoading,
    setError,
    setOnlineStatus,
    // Close object/block
  };
  // Close object/block
};

// Export constant useCheckout
export const useCheckout = () => {
  // Declare variable cart
  const cart = useCart();
  // Declare variable createOrder
  const createOrder = useStore((state) => state.createOrder);
  // Declare variable showToast
  const showToast = useStore((state) => state.showToast);

  // Return value from function
  return async () => {
    // Conditional statement
    if (cart.length === 0) {
      showToast(
        "warning",
        "Cart Empty",
        "Please add items to your cart before checking out"
      );
      return;
      // End block
    }

    // Begin try-catch block
    try {
      // Wait for async operation
      await createOrder();
      showToast(
        "success",
        "Order Placed",
        "Your order has been placed successfully!"
      );
    } catch (error) {
      showToast(
        "error",
        "Checkout Failed",
        "There was an error processing your order"
      );
      // Throw error
      throw error;
      // End block
    }
    // Close object/block
  };
  // Close object/block
};

// Export constant useProductSearch
export const useProductSearch = () => {
  // Declare variable setFilters
  const setFilters = useStore((state) => state.setFilters);
  // Declare variable getFilteredProducts
  const getFilteredProducts = useStore((state) => state.getFilteredProducts);

  // Return value from function
  return {
    // Define arrow function
    search: (query: string) => setFilters({ searchQuery: query }),
    results: getFilteredProducts(),
    // Close object/block
  };
  // Close object/block
};

// Export constant resetStore
export const resetStore = () => {
  useStore.setState({
    currentUser: null,
    isAuthenticated: false,
    cart: [],
    wishlist: new Set(),
    notifications: [],
    unreadCount: 0,
    modalStack: [],
    // Close object/block
  });
  // Close object/block
};
