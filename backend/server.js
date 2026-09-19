require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const aiRoutes = require("./routes/aiRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ebookcreator-frontend-a16v.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);

// Production frontend
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  // SPA fallback (Express-safe, Node 24-safe)
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
