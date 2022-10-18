import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Canvas from "./Canvas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <Canvas />
  </React.StrictMode>
);
