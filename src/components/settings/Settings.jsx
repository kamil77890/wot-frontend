import * as React from "react";
import "./Settings.scss";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { Link } from "react-router-dom";

function Settings({ nick }) {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`theme-toggle ${isDarkMode ? "dark" : "light"}`}>
      <IoMdSettings onClick={() => setOpen(!open)} className="settings-icon" />
      <div
        className={`settings-panel ${isDarkMode ? "dark" : "light"} ${
          open ? "open" : ""
        }`}
      >
        <Link to="/Phone">Add phone messages</Link>
        <div>
          <h3>Dark mode</h3>
          <span>{isDarkMode ? "🌙" : "☀️"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="logout">Log out</div>
      </div>
    </div>
  );
}

export default Settings;
