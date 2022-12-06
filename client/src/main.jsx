import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TracksContextProvider } from "./context/TracksContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <TracksContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TracksContextProvider>
  </AuthContextProvider>
);
