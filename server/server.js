require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Import Route Handlers
const authRoutes = require("./src/routes/auth.routes");
const noteRoutes = require("./src/routes/note.routes");
const adminRoutes = require("./src/routes/admin.routes");

// Boot Database
connectDB();

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  API Router Mountpoint (with API versioning) 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/admin", adminRoutes);

// Fallback Route for Undefined Enpoints
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource route not found" });
});

// Central Error Handling Layer
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server operating cleanly in ${process.env.NODE_ENV} mode on port ${PORT}`);
});