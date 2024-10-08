import axios from "axios";

export const get_personal_data = async (account_id) => {
  try {
    const response = await axios.get(
      `https://api.worldoftanks.eu/wot/account/info/?application_id=1ab4f4759f389a4dcf06ebee1d24d379&account_id=${account_id}`
    );
    return response.data.data; // Return data directly
  } catch (error) {
    console.error("Error fetching personal data:", error);
    throw error;
  }
};

export const get_nick = (nick = NaN) => {
  const nickanames = [];
  nickanames.push(nick);
  return nickanames.length > 0 ? nickanames[nickanames.length - 1] : null;
};

export const get_actual_nick = () => {
  return get_nick();
};

export const Stats = async (nick) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/cats?nick=${nick}`);
    return response.data; // Return the data object directly
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error; // Handle error appropriately
  }
};

export const getColorClass = (value, type) => {
  if (type === "winrate") {
    if (value < 45) return "text-black"; // Very Bad
    if (value < 45.1) return "text-red"; // Bad
    if (value < 47) return "text-orange"; // Below Average
    if (value < 49) return "text-yellow"; // Average
    if (value < 52) return "text-green"; // Good
    if (value < 54) return "text-dark-green"; // Very Good
    if (value < 56) return "text-blue"; // Great
    if (value < 60) return "text-light-purple"; // Unique
    return "text-purple"; // Super Unique
  } else if (type === "wn7") {
    if (value < 500) return "text-black"; // Very Bad
    if (value < 700) return "text-red"; // Bad
    if (value < 900) return "text-orange"; // Below Average
    if (value < 1100) return "text-yellow"; // Average
    if (value < 1350) return "text-green"; // Good
    if (value < 1550) return "text-dark-green"; // Very Good
    if (value < 1850) return "text-blue"; // Great
    if (value < 2049) return "text-light-purple"; // Unique
    return "text-purple"; // Super Unique
  } else if (type === "wn8") {
    if (value < 300) return "text-black"; // Very Bad
    if (value < 600) return "text-red"; // Bad
    if (value < 900) return "text-orange"; // Below Average
    if (value < 1200) return "text-yellow"; // Average
    if (value < 1600) return "text-green"; // Good
    if (value < 1900) return "text-dark-green"; // Very Good
    if (value < 2350) return "text-blue"; // Great
    if (value < 2900) return "text-light-purple"; // Unique
    return "text-purple"; // Super Unique
  }
  return "";
};

export const sendDataToBackend = async (phoneNum, nick) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/cats?nick=${nick}&phone=${phoneNum}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
};
