import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated
import PhoneConection from "./components/PhoneConection";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Phone" element={<PhoneConection />} />
      </Routes>
    </Router>
  </ThemeProvider>
);
