import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";

const root = createRoot();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
