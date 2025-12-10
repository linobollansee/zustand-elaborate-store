// Import module from react
import React from "react";
// Import specific exports from ../store
import { useToasts, useNotificationActions } from "../store";
// Import statement
import "./ToastContainer.css";

// Declare variable ToastContainer
const ToastContainer: React.FC = () => {
  // Declare variable toasts
  const toasts = useToasts();
  // Declare variable {
  const { dismissToast } = useNotificationActions();

  // Conditional statement
  if (toasts.length === 0) return null;

  // Return value from function
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} toast-enter`}>
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === "success" && "✓"}
              {toast.type === "error" && "✕"}
              {toast.type === "warning" && "⚠"}
              {toast.type === "info" && "ℹ"}
            </div>
            <div className="toast-text">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
            <button
              className="toast-close"
              onClick={() => dismissToast(toast.id)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  // Close object/block
};

// Export declaration
export default ToastContainer;
