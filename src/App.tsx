// Import specific exports from react
import { useEffect } from "react";

// Import statement
import {
  useCurrentUser,
  useIsAuthenticated,
  useTheme,
  useCartItemCount,
  useUnreadCount,
  useUserActions,
  useProductActions,
  useNotificationActions,
  useUIActions,
} from "./store";

// Import module from ./components/Dashboard
import Dashboard from "./components/Dashboard";

// Import module from ./components/LoginForm
import LoginForm from "./components/LoginForm";

// Import module from ./components/ToastContainer
import ToastContainer from "./components/ToastContainer";

// Import statement
import "./App.css";

// Define function App
function App() {
  // Declare variable currentUser
  const currentUser = useCurrentUser();

  // Declare variable isAuthenticated
  const isAuthenticated = useIsAuthenticated();

  // Declare variable theme
  const theme = useTheme();

  // Declare variable cartItemCount
  const cartItemCount = useCartItemCount();

  // Declare variable unreadCount
  const unreadCount = useUnreadCount();

  // Declare variable {
  const { logout } = useUserActions();

  // Declare variable {
  const { fetchProducts } = useProductActions();

  // Declare variable {
  const { showToast } = useNotificationActions();

  // Declare variable {
  const { setTheme, setOnlineStatus } = useUIActions();

  // Define arrow function
  useEffect(() => {
    // Declare variable handleOnline
    const handleOnline = () => {
      setOnlineStatus(true);
      showToast("success", "Back Online", "Your connection has been restored");
      // Close object/block
    };

    // Declare variable handleOffline
    const handleOffline = () => {
      setOnlineStatus(false);
      showToast("warning", "No Connection", "You are currently offline");
      // Close object/block
    };

    // Add event listener
    window.addEventListener("online", handleOnline);
    // Add event listener
    window.addEventListener("offline", handleOffline);

    // Conditional statement
    if (isAuthenticated) {
      fetchProducts();
      // End block
    }

    // Return value from function
    return () => {
      // Remove event listener
      window.removeEventListener("online", handleOnline);
      // Remove event listener
      window.removeEventListener("offline", handleOffline);
      // Close object/block
    };
  }, [isAuthenticated, fetchProducts, showToast, setOnlineStatus]);

  // Define arrow function
  useEffect(() => {
    // Conditional statement
    if (theme === "auto") {
      // Declare variable prefersDark
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.setAttribute(
        "data-theme",
        // Ternary conditional
        prefersDark ? "dark" : "light"
      );
    } else {
      document.documentElement.setAttribute("data-theme", theme);
      // End block
    }
  }, [theme]);

  // Declare variable handleThemeToggle
  const handleThemeToggle = () => {
    // Ternary conditional
    setTheme(theme === "light" ? "dark" : "light");
    // Close object/block
  };

  // Declare variable handleLogout
  const handleLogout = () => {
    logout();
    showToast("info", "Logged Out", "You have been successfully logged out");
    // Close object/block
  };

  // Conditional statement
  if (!isAuthenticated) {
    // Return value from function
    return (
      <div className="app">
        <LoginForm />
        <ToastContainer />
      </div>
    );
    // End block
  }

  // Return value from function
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Elaborate Zustand Store</h1>

          <div className="header-actions">
            <div className="user-info">
              {currentUser?.avatar && (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="user-avatar"
                />
              )}
              <span className="user-name">{currentUser?.name}</span>
            </div>

            <div className="header-badges">
              {cartItemCount > 0 && (
                <span className="badge badge-primary">🛒 {cartItemCount}</span>
              )}
              {unreadCount > 0 && (
                <span className="badge badge-warning">🔔 {unreadCount}</span>
              )}
            </div>

            <button
              className="btn btn-icon"
              onClick={handleThemeToggle}
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Dashboard />
      </main>

      <ToastContainer />
    </div>
  );
  // End block
}

// Export declaration
export default App;
