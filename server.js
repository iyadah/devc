const express = require("express");

const connectDB = require("./config/db");
var cors = require("cors");

const app = express();

// connect to db
connectDB();

app.get("/", (req, res) => res.send("API RUNNING"));

//Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/exams", require("./routes/api/exams"));
app.use("/api/services", require("./routes/api/services"));
app.use("/api/comments", require("./routes/api/test"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
