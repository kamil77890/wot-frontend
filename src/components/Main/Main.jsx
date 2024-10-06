import React, { useState, useEffect } from "react";
import "./Main.scss";
import { Stats, getColorClass } from "../../utils";
import WinrateVsWN8Chart from "./WinrateVsWN8Chart";

const Main = React.memo(({ nick }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        if (nick) {
          const data = await Stats(nick);
          setStats(data);
        }
      } catch (err) {
        setError("Failed to fetch stats.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [nick]);

  const renderMessage = (message) => (
    <div className="message-container centered-message">
      <p>{message}</p>
    </div>
  );

  if (!nick) {
    return renderMessage("No player selected!");
  }

  if (loading) {
    return renderMessage("Loading...");
  }

  if (error) {
    return renderMessage(error);
  }

  const getRawWinrate = (winrate) => {
    const winrateValue = parseFloat(winrate);
    if (isNaN(winrateValue) || winrateValue < 0 || winrateValue > 100) {
      return null;
    }
    return winrateValue;
  };

  const formatWinrate = (winrateValue) => {
    if (winrateValue === null) {
      return "Invalid";
    }
    return `${winrateValue}%`;
  };

  const validateWN = (wnValue) => {
    const wn = parseFloat(wnValue);
    if (isNaN(wn) || wn < 0 || wn > 5000) {
      return null;
    }
    return wn;
  };

  const formatWN = (wnValue) => {
    return wnValue === null ? "Invalid" : wnValue;
  };

  const renderStatRow = (period, data) => {
    if (!data) {
      return (
        <tr key={period}>
          <td>{period}</td>
          <td colSpan="4">No data available</td>
        </tr>
      );
    }

    const { battles, winrate, wn7, wn8 } = data;

    const rawWinrate = getRawWinrate(winrate);
    const rawWN7 = validateWN(wn7);
    const rawWN8 = validateWN(wn8);

    return (
      <tr key={period}>
        <td>{period}</td>
        <td>{battles || "N/A"}</td>
        <td className={getColorClass(rawWinrate, "winrate")}>
          {formatWinrate(rawWinrate)}
        </td>
        <td className={rawWN7 === null ? "" : getColorClass(rawWN7, "wn7")}>
          {formatWN(rawWN7)}
        </td>
        <td className={rawWN8 === null ? "" : getColorClass(rawWN8, "wn8")}>
          {formatWN(rawWN8)}
        </td>
      </tr>
    );
  };

  const chartData = [
    {
      wn8: stats["24"] ? validateWN(stats["24"].wn8) : null,
      winrate: stats["24"] ? getRawWinrate(stats["24"].winrate) : null,
    },
    {
      wn8: stats["7d"] ? validateWN(stats["7d"].wn8) : null,
      winrate: stats["7d"] ? getRawWinrate(stats["7d"].winrate) : null,
    },
    {
      wn8: stats["30d"] ? validateWN(stats["30d"].wn8) : null,
      winrate: stats["30d"] ? getRawWinrate(stats["30d"].winrate) : null,
    },
  ].filter((item) => item.wn8 !== null && item.winrate !== null);

  return (
    <div className="main-container">
      <h1>Player Stats: {nick}</h1>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Period</th>
            <th>Battles</th>
            <th>Winrate</th>
            <th>WN7</th>
            <th>WN8</th>
          </tr>
        </thead>
        <tbody>
          {renderStatRow("24h", stats["24"])}
          {renderStatRow("7d", stats["7d"])}
          {renderStatRow("30d", stats["30d"])}
        </tbody>
      </table>
      <WinrateVsWN8Chart data={chartData} />
    </div>
  );
});

export default Main;
