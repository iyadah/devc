const express = require("express");
const elasticsearch = require("elasticsearch");
const tests = require("./models/Test");
const connectDBES = require("./config/db");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1255243",
  key: "50620317c3650858972b",
  secret: "453c7370afb969c21e80",
  cluster: "ap2",
  useTLS: true,
});
const channel = "tests";

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

const changeStream = tests.watch();
changeStream.on("change", (change) => {
  console.log(change);

  if (change.operationType === "insert") {
    const comment = change.fullDocument;
    pusher.trigger(channel, "inserted", {
      id: comment._id,
      comment: comment.comment,
    });
  } else if (change.operationType === "delete") {
    pusher.trigger(channel, "deleted", change.documentKey._id);
  } else if (change.operationType === "update") {
    const comment = change.updateDescription;
    if (comment.updatedFields.hasOwnProperty("comment")) {
      console.log(comment.updatedFields.comment);
      pusher.trigger(channel, "update", {
        id: change.documentKey._id,
        comment: comment.updatedFields.comment,
      });
    }
  }
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/exams", require("./routes/api/exams"));
app.use("/api/services", require("./routes/api/services"));
app.use("/api/comments", require("./routes/api/test"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
