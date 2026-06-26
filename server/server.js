const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes =
  require("./routes/authRoutes");
  
const aiRoutes =
  require("./routes/aiRoutes");
const habitRoutes =
  require("./routes/habitRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/habits",
  habitRoutes
);
app.use(
  "/api/ai",
  aiRoutes
);

app.get("/", (req, res) => {
  res.send("HabitForge Backend Running 🚀");
});

const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});