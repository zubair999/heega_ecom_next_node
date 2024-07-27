const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const productSchema = new Schema({
  _id: {
    $oid: {
      type: "ObjectId",
    },
  },
  id: {
    $numberLong: {
      type: "String",
    },
  },
  title: {
    type: "String",
  },
  body_html: {
    type: "String",
  },
  collection: "Mixed",
  vendor: {
    type: "String",
  },
  product_type: {
    type: "String",
  },
  created_at: {
    type: "Date",
  },
  handle: {
    type: "String",
  },
  updated_at: {
    type: "Date",
  },
  published_at: {
    type: "Date",
  },
  template_suffix: {
    type: "String",
  },
  published_scope: {
    type: "String",
  },
  tags: {
    type: "String",
  },
  status: {
    type: "String",
  },
  admin_graphql_api_id: {
    type: "String",
  },
  variants: {
    type: ["Mixed"],
  },
  options: {
    type: ["Mixed"],
  },
  images: {
    type: ["Mixed"],
  },
  image: {
    id: {
      $numberLong: {
        type: "String",
      },
    },
    alt: {
      type: "Mixed",
    },
    position: {
      type: "Number",
    },
    product_id: {
      $numberLong: {
        type: "String",
      },
    },
    created_at: {
      type: "Date",
    },
    updated_at: {
      type: "Date",
    },
    admin_graphql_api_id: {
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
    variant_ids: {
      type: "Array",
    },
  },
});

module.exports = mongoose.model("product", productSchema);
