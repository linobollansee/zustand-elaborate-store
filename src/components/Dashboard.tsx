// Import specific exports from react
import React, { useEffect, useState } from "react";
// Import statement
import {
  useProducts,
  useCart,
  useWishlist,
  useProductActions,
  useNotificationActions,
  useCheckout,
  useFilteredProducts,
} from "../store";
// Import module from ./ProductCard
import ProductCard from "./ProductCard";
// Import module from ./Cart
import Cart from "./Cart";
// Import statement
import "./Dashboard.css";

// Declare variable Dashboard
const Dashboard: React.FC = () => {
  // Declare variable products
  const products = useProducts();
  // Declare variable cart
  const cart = useCart();
  // Declare variable wishlist
  const wishlist = useWishlist();

  // Declare variable [activeTab,
  const [activeTab, setActiveTab] = useState<"products" | "cart" | "wishlist">(
    "products"
  );
  // Declare variable [loading,
  const [loading, setLoading] = useState(false);

  // Declare variable {
  const { fetchProducts, setFilters, setSort } = useProductActions();
  // Declare variable {
  const { showToast } = useNotificationActions();
  // Declare variable checkout
  const checkout = useCheckout();

  // Get filtered products based on current filters and sort
  const filteredProducts = useFilteredProducts();

  // Define arrow function
  useEffect(() => {
    // Declare variable loadProducts
    const loadProducts = async () => {
      setLoading(true);
      // Begin try-catch block
      try {
        // Wait for async operation
        await fetchProducts();
      } catch (error) {
        showToast("error", "Error", "Failed to load products");
      } finally {
        setLoading(false);
        // End block
      }
      // Close object/block
    };

    // Conditional statement
    if (products.size === 0) {
      loadProducts();
      // End block
    }
  }, [products.size, fetchProducts, showToast]);

  // Declare variable productArray
  const productArray = Array.from(products.values());

  // Declare variable wishlistProducts
  const wishlistProducts = filteredProducts.filter((p) => wishlist.has(p.id));

  // Declare variable handleCategoryFilter
  const handleCategoryFilter = (category: string) => {
    // Ternary conditional
    setFilters({ category: category === "all" ? undefined : category });
    // Close object/block
  };

  // Declare variable handleSortChange
  const handleSortChange = (field: "name" | "price" | "rating") => {
    setSort({ field, direction: "asc" });
    // Close object/block
  };

  // Return value from function
  return (
    <div className="dashboard">
      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === "products" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Products ({productArray.length})
        </button>
        <button
          className={`tab ${activeTab === "cart" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("cart")}
        >
          Cart ({cart.length})
        </button>
        <button
          className={`tab ${activeTab === "wishlist" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("wishlist")}
        >
          Wishlist ({wishlist.size})
        </button>
      </div>

      {activeTab === "products" && (
        <div className="products-view">
          <div className="products-header">
            <h2>Product Catalog</h2>
            <div className="products-filters">
              <select
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
                <option value="Books">Books</option>
                <option value="Sports">Sports</option>
              </select>

              <select
                onChange={(e) => handleSortChange(e.target.value as any)}
                className="filter-select"
              >
                <option value="createdAt">Newest</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.slice(0, 12).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "cart" && <Cart onCheckout={checkout} />}

      {activeTab === "wishlist" && (
        <div className="wishlist-view">
          <h2>Your Wishlist</h2>
          {wishlistProducts.length === 0 ? (
            <div className="empty-state">
              <p>Your wishlist is empty</p>
              <button
                className="btn btn-primary"
                onClick={() => setActiveTab("products")}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
  // Close object/block
};

// Export declaration
export default Dashboard;
