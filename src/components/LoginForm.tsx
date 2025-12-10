// Import specific exports from react
import React, { useState } from "react";
// Import specific exports from ../store
import { useUserActions, useNotificationActions } from "../store";
// Import statement
import "./LoginForm.css";

// Declare variable LoginForm
const LoginForm: React.FC = () => {
  // Declare variable [email,
  const [email, setEmail] = useState("demo@example.com");
  // Declare variable [password,
  const [password, setPassword] = useState("password123");
  // Declare variable [loading,
  const [loading, setLoading] = useState(false);

  // Declare variable {
  const { login } = useUserActions();
  // Declare variable {
  const { showToast } = useNotificationActions();

  // Declare variable handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Begin try-catch block
    try {
      // Wait for async operation
      await login(email, password);
      showToast("success", "Welcome!", "You have successfully logged in");
    } catch (error) {
      showToast(
        "error",
        "Login Failed",
        "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
      // End block
    }
    // Close object/block
  };

  // Return value from function
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Elaborate Zustand Store</h1>
        <p className="login-subtitle">Advanced State Management Demo</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : "Sign In"}
          </button>
        </form>

        <div className="login-features">
          <h3>Features Included:</h3>
          <ul>
            <li>✅ Multi-slice store architecture</li>
            <li>✅ User authentication & preferences</li>
            <li>✅ Product catalog with cart & wishlist</li>
            <li>✅ Real-time notifications & toasts</li>
            <li>✅ UI state management (theme, modals, loading)</li>
            <li>✅ WebSocket & analytics tracking</li>
            <li>✅ Persist middleware with localStorage</li>
            <li>✅ DevTools integration</li>
            <li>✅ TypeScript throughout</li>
            <li>✅ Optimized selectors & custom hooks</li>
          </ul>
        </div>
      </div>
    </div>
  );
  // Close object/block
};

// Export declaration
export default LoginForm;
