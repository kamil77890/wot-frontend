import React, { useState, useCallback } from "react";
import Input from "./components/Input";
import Main from "./components/Main";
import Settings from "./components/Settings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhoneConnection from "./components/PhoneConection";

const App = () => {
  const [nick, setNick] = useState("");

  const handleNickChange = useCallback((selectedNick) => {
    setNick(selectedNick);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Settings nick={nick} />
              <Input onNickChange={handleNickChange} />
              <Main nick={nick} />
            </>
          }
        />
        <Route path="/Phone" element={<PhoneConnection nick={nick} />} />
        <Route
          path="/gówno"
          element={
            <div>
              <h2>gówno</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
