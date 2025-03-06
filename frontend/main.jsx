import React from "react"; // Import React
import { createRoot } from "react-dom/client"; // Import createRoot correctly
import "./index.css";
import ContextProvider from "./context/ContextProvider";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root")); // Correct initialization

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
