const mangoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const elasticsearch = require("elasticsearch");
var client;
const connectDB = async () => {
  try {
    await mangoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Mongodb connected..");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const connectES = async () => {
  try {
    client = await new elasticsearch.Client({
      hosts: ["http://localhost:9200"],
    });
    client.ping({
      requestTimeout: 30000,
    });
    console.log(client);
    console.log("ES connected..");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  connectES,
};
module.exports.client = client;
