import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const WinrateVsWN8Chart = ({ nick }) => {
  const [data, setData] = useState([]);

  // Function to fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/name-stats?nick=${nick}`
        );
        const statsData = await response.json();

        // Format data for the chart
        const formattedData = statsData.map((stat) => ({
          wn8: parseInt(stat.wn8),
          battles: parseInt(stat.battles),
          time: stat.time,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [nick]);

  return (
    <div className="chart-container">
      <h2>Winrate vs WN8 for {nick}</h2>
      <LineChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis
          dataKey="wn8"
          label={{ value: "WN8", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis
          label={{ value: "Battles", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="battles"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default WinrateVsWN8Chart;
