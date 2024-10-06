import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PhoneConection.scss";
import { PiArrowElbowLeftFill } from "react-icons/pi";

function PhoneConnection() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^\d{3}-\d{3}-\d{3}$/;

    if (phoneRegex.test(phoneNumber)) {
      console.log("Numer telefonu:", phoneNumber);
    } else {
      setError("Proszę wprowadzić prawidłowy numer telefonu (XXX-XXX-XXX).");
    }
  };

  return (
    <div className="phone-connection">
      <div className="back">
        <Link to="/">
          <PiArrowElbowLeftFill />
        </Link>
      </div>

      <h2>Połączenie z telefonem</h2>
      <p>
        Wprowadź swój numer telefonu, aby otrzymywać powiadomienia o postępach w
        grze World of Tanks.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          placeholder="Wprowadź numer telefonu (XXX-XXX-XXX)"
          value={phoneNumber}
          onChange={handleInputChange}
          required
          className="phone-input"
          maxLength={11}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Zatwierdź
        </button>
      </form>

      <div className="notification-guide">
        <h3>Jak otrzymywać powiadomienia:</h3>
        <ol>
          <li>
            Na telefonie pobierz aplikację <strong>Pushover</strong>.
          </li>
          <li>Wprowadź swój numer telefonu w polu powyżej.</li>
          <li>
            Po zatwierdzeniu, będziesz otrzymywać powiadomienia o aktywności
            oraz postępach w grze!
          </li>
        </ol>
      </div>
    </div>
  );
}

export default PhoneConnection;
