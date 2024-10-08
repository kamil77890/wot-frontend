import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import PhoneConnection from "./components/PhoneConection";
import "./index.css";

const root = createRoot(document.getElementById("root"));

function MainApp() {
  const [nick, setNick] = useState("");

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

root.render(<MainApp />);
