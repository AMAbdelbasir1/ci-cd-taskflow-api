const express = require("express");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;
