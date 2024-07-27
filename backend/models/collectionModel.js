const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const collectionSchema = new Schema({
  _id: {
    $oid: {
      type: "ObjectId",
    },
  },
  handle: {
    type: "String",
  },
  title: {
    type: "String",
  },
  updated_at: {
    type: "Date",
  },
  body_html: {
    type: "String",
  },
  published_at: {
    type: "Date",
  },
  sort_order: {
    type: "String",
  },
  template_suffix: {
    type: "Mixed",
  },
  products_count: {
    type: "Number",
  },
  collection_type: {
    type: "String",
  },
  published_scope: {
    type: "String",
  },
  admin_graphql_api_id: {
    type: "String",
  },
  image: {
    created_at: {
      type: "Date",
    },
    alt: {
      type: "String",
    },
    width: {
      type: "Number",
    },
    height: {
      type: "Number",
    },
    src: {
      type: "String",
    },
  },
});

module.exports = mongoose.model("collection", collectionSchema);
