import 'materialize-css/dist/css/materialize.min.css'; // Import Materialize CSS
import './App.css'; // Import custom CSS
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Initialize and render the root component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
