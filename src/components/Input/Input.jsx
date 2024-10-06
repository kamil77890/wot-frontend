import React, { useState, useCallback } from "react";
import "./Input.scss";
import axios from "axios";

const api = "1ab4f4759f389a4dcf06ebee1d24d379";

const Input = React.memo(({ onNickChange }) => {
  const [nick, setNick] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(async (input) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.worldoftanks.eu/wot/account/list/?application_id=${api}&search=${input}&type=startswith&limit=10`
      );
      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching player suggestions:", error);
      setSuggestions([]);
    }
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setNick(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setNick(suggestion.nickname);
    setSuggestions([]);
    onNickChange(suggestion.nickname);
  };

  return (
    <div className="input-container">
      <input
        type="text"
        name="nick"
        value={nick}
        onChange={handleInputChange}
        placeholder="Enter player name"
        className="input-field"
      />

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.account_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion.nickname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default Input;
