const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const filterSchema = new Schema({
  _id: {
    $oid: {
      type: "ObjectId",
    },
  },
  collection_id: {
    type: "String",
  },
  options: {
    type: ["Mixed"],
  },
});

module.exports = mongoose.model("filter", filterSchema);
