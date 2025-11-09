const express = require("express");

const uploadRoutes = require("./routes/upload.routes");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", uploadRoutes);

app.use("/api/ai", aiRoutes);

// Test
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
