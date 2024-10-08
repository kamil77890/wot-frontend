import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendDataToBackend } from "../../utils";
import "./PhoneConection.scss";
import { PiArrowElbowLeftFill } from "react-icons/pi";

function PhoneConection({ nick }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 3) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    }

    if (value.length > 7) {
      value = value.slice(0, 7) + "-" + value.slice(7);
    }

    setPhoneNumber(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^\d{3}-\d{3}-\d{3}$/;

    if (phoneRegex.test(phoneNumber)) {
      try {
        await sendDataToBackend(phoneNumber, nick);
        setError("Number successfully added to the server!");
      } catch {
        setError("Error sending data to server.");
      }
    } else {
      setError("Please enter a valid phone number (XXX-XXX-XXX).");
    }
  };

  return (
    <div className="phone-connection">
      <div className="back">
        <Link to="/">
          <PiArrowElbowLeftFill />
        </Link>
      </div>

      <h2>Phone Connection</h2>
      <p>
        Enter your phone number to receive notifications about your World of
        Tanks progress.
      </p>

      {nick && <p>Current player: {nick}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          placeholder="Enter phone number (XXX-XXX-XXX)"
          value={phoneNumber}
          onChange={handleInputChange}
          required
          className="phone-input"
          maxLength={11}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <div className="notification-guide">
        <h3>How to receive notifications:</h3>
        <ol>
          <li>
            Download the <strong>Pushover</strong> app on your phone.
          </li>
          <li>Enter your phone number in the field above.</li>
          <li>
            After submission, you'll receive notifications about your game
            activity!
          </li>
        </ol>
      </div>
    </div>
  );
}

export default PhoneConection;
