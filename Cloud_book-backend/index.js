const express = require("express");
const mongoDb = require("./init/mongoDb");
const { authRoute, notesRoute } = require("./Routes");
const { config } = require("dotenv");
const cors = require("cors");

const port = 7000;

// config
config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/note", notesRoute);

// Optional: health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    status: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    status: false,
    message: "Route not found",
  });
});

(async () => {
  await mongoDb();
  app.listen(port, () => {
    console.log(`You're running on http://localhost:${port}`);
  });
})();
