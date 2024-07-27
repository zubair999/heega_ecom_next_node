const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItem = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  variant_id: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  itemTotal: {
    type: Number,
    required: true
  }
}, { _id: false })



const orderSchema = new Schema({
  order_id: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  items: {
    type: [orderItem],
  },
  total: {
    type: Number,
    required: true
  }
});



module.exports = mongoose.model("order", orderSchema);
