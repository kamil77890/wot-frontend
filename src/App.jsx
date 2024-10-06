import React, { useState, useCallback } from "react";
import Input from "./components/Input";
import Main from "./components/Main";
import Settings from "./components/settings";

const App = () => {
  const [nick, setNick] = useState("");

  const handleNickChange = useCallback((selectedNick) => {
    setNick(selectedNick);
  }, []);

  return (
    <div>
      <Settings />
      <Input onNickChange={handleNickChange} />
      <Main nick={nick} />
    </div>
  );
};

export default App;
