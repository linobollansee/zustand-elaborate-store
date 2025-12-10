// Import module from react
import React from "react";
// Import specific exports from ../types
import { Product } from "../types";
// Import specific exports from ../store
import { useProductActions } from "../store";
// Import statement
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  // End block
}

// Declare variable ProductCard
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Declare variable {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useProductActions();
  // Declare variable inWishlist
  const inWishlist = isInWishlist(product.id);

  // Declare variable handleAddToCart
  const handleAddToCart = () => {
    addToCart(product.id, 1);
    // Close object/block
  };

  // Declare variable handleWishlistToggle
  const handleWishlistToggle = () => {
    // Conditional statement
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
      // End block
    }
    // Close object/block
  };

  // Return value from function
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
        />
        <button
          className={`wishlist-btn ${inWishlist ? "wishlist-active" : ""}`}
          onClick={handleWishlistToggle}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {inWishlist ? "❤️" : "🤍"}
        </button>
        {product.stock === 0 && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>

      <div className="product-details">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description.slice(0, 80)}...
        </p>

        <div className="product-rating">
          <span className="rating-stars">
            {"⭐".repeat(Math.round(product.rating))}
          </span>
          <span className="rating-value">({product.rating.toFixed(1)})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        {product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  // Close object/block
};

// Export declaration
export default ProductCard;
