const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Task Tracker Backend!");
});

const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});