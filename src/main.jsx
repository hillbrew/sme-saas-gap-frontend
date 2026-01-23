import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppInitializer from "./AppInitializer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
    <BrowserRouter>
      <AppInitializer>
        <App />
      </AppInitializer>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
