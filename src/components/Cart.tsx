// Import module from react
import React from "react";
// Import statement
import {
  useCart,
  useProducts,
  useProductActions,
  useCartTotal,
} from "../store";
// Import statement
import "./Cart.css";

interface CartProps {
  // Define arrow function
  onCheckout: () => Promise<void>;
  // End block
}

// Declare variable Cart
const Cart: React.FC<CartProps> = ({ onCheckout }) => {
  // Declare variable cart
  const cart = useCart();
  // Declare variable products
  const products = useProducts();
  // Declare variable total
  const total = useCartTotal();
  // Declare variable {
  const { updateCartQuantity, removeFromCart, clearCart } = useProductActions();

  // Conditional statement
  if (cart.length === 0) {
    // Return value from function
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
    // End block
  }

  // Declare variable handleCheckout
  const handleCheckout = async () => {
    // Begin try-catch block
    try {
      // Wait for async operation
      await onCheckout();
    } catch (error) {
      console.error("Checkout failed:", error);
      // End block
    }
    // Close object/block
  };

  // Return value from function
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="btn btn-secondary" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cart.map((item) => {
          const product = products.get(item.productId);
          if (!product) return null;

          const itemTotal = product.price * item.quantity;

          return (
            <div key={item.productId} className="cart-item">
              <img
                src={product.images[0]}
                alt={product.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h3 className="cart-item-name">{product.name}</h3>
                <div className="cart-item-category">{product.category}</div>
                <div className="cart-item-price">
                  ${product.price.toFixed(2)} each
                </div>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateCartQuantity(
                        item.productId,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateCartQuantity(
                        item.productId,
                        Math.min(product.stock, item.quantity + 1)
                      )
                    }
                    disabled={item.quantity >= product.stock}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">${itemTotal.toFixed(2)}</div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.productId)}
                  title="Remove from cart"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>FREE</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
  // Close object/block
};

// Export declaration
export default Cart;
