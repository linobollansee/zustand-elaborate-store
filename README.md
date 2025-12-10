# Zustand Elaborate Store

A production-ready, enterprise-grade state management system built with Zustand, showcasing advanced patterns, TypeScript best practices, and comprehensive e-commerce functionality.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run lint
```

**Access the app:** http://localhost:5173

**Demo Credentials:**

- Email: `demo@example.com`
- Password: `password123`

## ✨ Features

### 🏗️ Architecture

- **Multi-slice store** with domain separation (User, Product, Notification, UI, WebSocket, Analytics)
- **TypeScript** with strict type checking
- **Middleware stack**: Immer for immutability, Persist for localStorage, DevTools for debugging
- **Optimized selectors** preventing unnecessary re-renders
- **Custom hooks** for common operations

### 🔐 User Management

- Complete authentication flow (login, logout, register)
- Session management with token refresh
- User preferences (theme, notifications, privacy settings)
- Profile management with avatar upload
- Password reset and email verification

### 🛍️ E-commerce Features

- Product catalog with CRUD operations
- Advanced filtering (category, price, rating, tags, stock)
- Multi-criteria sorting (name, price, rating, date)
- Shopping cart with quantity management
- Wishlist functionality
- Order management (create, track, cancel)
- Product comparison
- Recently viewed products
- Product reviews and ratings

### 🔔 Notifications

- In-app notification system
- Toast messages (success, error, warning, info)
- Read/unread tracking
- Auto-dismiss with configurable duration
- Notification actions and callbacks

### 🎨 UI State Management

- Theme switching (light, dark, auto)
- Modal stack management
- Sidebar toggle
- Loading states per operation
- Error tracking with context
- Online/offline status detection

### 📡 Real-time Features

- WebSocket connection management
- Message handling and broadcasting
- Connection state tracking
- Automatic reconnection
- Heartbeat monitoring

### 📊 Analytics

- Page view tracking
- Event logging with properties
- Session duration monitoring
- Unique visitor tracking

## 📦 Tech Stack

| Package    | Version | Purpose           |
| ---------- | ------- | ----------------- |
| React      | 19.2.1  | UI framework      |
| Zustand    | 5.0.9   | State management  |
| Immer      | 11.0.1  | Immutable updates |
| TypeScript | 5.9.3   | Type safety       |
| Vite       | 7.2.7   | Build tool        |

## 📂 Project Structure

```
zustand/
├── src/
│   ├── components/          # React components
│   │   ├── Cart.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LoginForm.tsx
│   │   ├── ProductCard.tsx
│   │   └── ToastContainer.tsx
│   ├── store/               # Zustand store
│   │   ├── slices/         # Domain slices
│   │   │   ├── userSlice.ts
│   │   │   ├── productSlice.ts
│   │   │   ├── notificationSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── miscSlices.ts
│   │   └── index.ts        # Store composition & hooks
│   ├── types/              # TypeScript definitions
│   │   └── index.ts
│   ├── middleware/         # Custom middleware
│   │   └── index.ts
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
├── dist/                   # Production build
└── package.json
```

## 🎯 Store Architecture

### Slices

**User Slice** (`userSlice.ts`)

- Authentication state and actions
- User profile management
- Preferences and settings
- Session handling

**Product Slice** (`productSlice.ts`)

- Product catalog management
- Cart operations
- Wishlist management
- Order processing
- Filtering and sorting
- Product reviews

**Notification Slice** (`notificationSlice.ts`)

- Notification queue
- Toast management
- Read/unread tracking
- Cleanup utilities

**UI Slice** (`uiSlice.ts`)

- Theme management
- Modal stack
- Loading states
- Error tracking
- Online status

**WebSocket Slice** (`miscSlices.ts`)

- Connection management
- Message handling
- Reconnection logic

**Analytics Slice** (`miscSlices.ts`)

- Event tracking
- Page views
- Session metrics

### Custom Hooks

```typescript
// Selector hooks (optimized)
useCurrentUser();
useProducts();
useFilteredProducts(); // Products filtered by current filters and sort
useCart();
useCartTotal();
useNotifications();
useTheme();

// Action hooks (stable references)
useUserActions();
useProductActions();
useNotificationActions();
useUIActions();

// Composite hooks
useCheckout();
useProductSearch();
```

## 🔧 Usage Examples

### Authentication

```typescript
import { useUserActions } from "./store";

function LoginButton() {
  const { login } = useUserActions();

  const handleLogin = async () => {
    await login("user@example.com", "password");
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### Shopping Cart

```typescript
import { useCart, useProductActions } from "./store";

function CartView() {
  const cart = useCart();
  const { addToCart, removeFromCart } = useProductActions();

  return (
    <div>
      {cart.map((item) => (
        <div key={item.productId}>
          <button onClick={() => removeFromCart(item.productId)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

### Notifications

```typescript
import { useNotificationActions } from "./store";

function NotifyButton() {
  const { showToast } = useNotificationActions();

  const notify = () => {
    showToast("success", "Done!", "Operation completed");
  };

  return <button onClick={notify}>Notify</button>;
}
```

### Theme Switching

```typescript
import { useTheme, useUIActions } from "./store";

function ThemeToggle() {
  const theme = useTheme();
  const { setTheme } = useUIActions();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

## 🎨 Styling

All components include scoped CSS modules:

- Responsive design
- CSS custom properties for theming
- Dark mode support
- Modern UI patterns

## 🧪 Type Safety

Full TypeScript coverage with:

- Strict mode enabled
- No implicit `any`
- Proper type inference
- Generic types for flexibility
- Discriminated unions for actions

## ⚡ Performance

- **Selective re-renders**: Components only update when their selected state changes
- **Memoized selectors**: Computed values cached efficiently
- **Immer integration**: Immutable updates with mutable syntax
- **Code splitting**: Vite's automatic chunking
- **Tree shaking**: Unused code eliminated

**Bundle Size:**

- JavaScript: 237 KB (75 KB gzipped)
- CSS: 12.8 KB (2.9 KB gzipped)

## 🔒 Security

- ✅ Zero vulnerabilities (npm audit)
- ✅ Latest stable dependencies
- ✅ No unsafe patterns
- ✅ Input validation
- ✅ XSS protection

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Type check without emit
```

### Adding a New Feature

1. Create or update slice in `src/store/slices/`
2. Export types in `src/types/index.ts`
3. Add selector hooks in `src/store/index.ts`
4. Create React components in `src/components/`
5. Add styles with scoped CSS

### State Structure Best Practices

```typescript
// ✅ Good: Normalized data
products: Map<string, Product>

// ❌ Avoid: Nested arrays
products: Product[]

// ✅ Good: Derived state via selector
const total = useCartTotal();

// ❌ Avoid: Storing derived state
total: number
```

## 📚 Learning Resources

- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
- [Immer Documentation](https://immerjs.github.io/immer/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React 19 Release Notes](https://react.dev/)

## 🤝 Contributing

This is a demonstration project showcasing best practices. Use it as a reference for:

- Enterprise-scale Zustand implementations
- TypeScript patterns with React
- State management architecture
- Performance optimization techniques

## 📄 License

MIT License - feel free to use this code in your projects!

## 💡 Key Takeaways

1. **Slice-based architecture** scales better than monolithic stores
2. **Custom hooks** provide clean API boundaries
3. **Middleware composition** adds powerful features without complexity
4. **TypeScript** catches bugs before runtime
5. **Optimized selectors** are critical for performance
6. **Persistent state** improves user experience
7. **DevTools integration** simplifies debugging

---

**Built with ❤️ using Zustand + React 19 + TypeScript + Vite**
