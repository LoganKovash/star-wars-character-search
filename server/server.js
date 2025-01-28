require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Route to search Star Wars characters
app.get("/api/search", async (req, res) => {
  const query = req.query.name;

  // Validate input - Allow only letters, numbers, and spaces
  const validPattern = /^[a-zA-Z0-9\s]*$/;

  if (!query || !validPattern.test(query)) {
    return res.status(400).json({ error: "Invalid input. Special characters are not allowed" });
  }

  try {
    const response = await axios.get(`https://swapi.dev/api/people/?search=${encodeURIComponent(query.trim())}`);

    if (response.data.results.length > 0) {
      res.json(response.data.results); // Return multiple results
    } else {
      res.status(404).json({ error: "No characters found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
