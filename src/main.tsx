// Import specific exports from react
import { StrictMode } from "react";

// Import specific exports from react-dom/client
import { createRoot } from "react-dom/client";

// Import module from ./App
import App from "./App";

// Import statement
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
