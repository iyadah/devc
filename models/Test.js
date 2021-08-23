const mongoose = require("mongoose");
const TestSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model("test", TestSchema);
