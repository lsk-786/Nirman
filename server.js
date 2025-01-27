// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// API keys (replace with your actual keys)
const WEATHER_API_KEY = "6eeb197f3f85fb9b35e44188e6f12104";
const LOCATION = "India"; // Change dynamically based on user input

// Endpoint for fetching data
app.get("/fetch-data", async (req, res) => {
  try {
    // Fetch Weather Data
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${WEATHER_API_KEY}`
    );
    const weatherData = weatherResponse.data;

    // Fetch Market Data (replace with real API or use mock data)
    const marketData = {
      volatility: 6, // Mock value (dynamic API call can replace this)
    };

    // Fetch Consumption Trends (mock for simplicity)
    const consumptionTrend = 12; // Mock percentage trend

    // Combine Data for AI Prediction
    const data = {
      weatherImpact: weatherData.main.temp, // Example: Use temperature
      marketVolatility: marketData.volatility,
      consumptionTrend,
    };

    res.json({ success: true, data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
