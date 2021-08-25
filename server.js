const express = require("express");
const elasticsearch = require("elasticsearch");

const connectDBES = require("./config/db");

var cors = require("cors");

const app = express();

// connect to db
connectDBES.connectDB();

const connectES = async () => {
  try {
    const client = await new elasticsearch.Client({
      hosts: ["http://localhost:9200"],
    });
    client.ping({
      requestTimeout: 30000,
    });
    client.index(
      {
        index: "comments",
        id: "1",
        type: "comments",
        body: {
          PostName: "Integrating Elasticsearch Into Your Node.js Application",
          PostType: "Tutorial",
          PostBody:
            "This is the text of our tutorial about using Elasticsearch in your Node.js application.",
        },
      },
      function (err, resp, status) {
        console.log(resp);
      }
    );
    console.log("ES connected..");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectES();

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
