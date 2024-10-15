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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/name-stats?nick=${nick}`
        );
        const statsData = await response.json();

        // Check the raw data received
        console.log("Raw statsData:", statsData);

        // Format the data
        const formattedData = statsData.map((stat) => ({
          wn8: parseInt(stat.wn8, 10), // Ensure it is parsed as integer
          battles: parseInt(stat.battles, 10), // Ensure it is parsed as integer
          time: stat.time,
        }));

        // Log formatted data before sorting
        console.log("Formatted data before sorting:", formattedData);

        // Sort the formatted data by battles (ascending) and then by wn8 (ascending)
        const sortedData = formattedData.sort((a, b) => {
          if (a.battles !== b.battles) {
            return a.battles - b.battles; // Sort by battles first
          }
          return a.wn8 - b.wn8; // Sort by wn8 if battles are the same
        });

        // Log sorted data
        console.log("Sorted data:", sortedData);

        // Set the sorted data
        setData(sortedData);
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
          dataKey="battles"
          label={{ value: "Battles", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis label={{ value: "WN8", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="wn8"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default WinrateVsWN8Chart;
