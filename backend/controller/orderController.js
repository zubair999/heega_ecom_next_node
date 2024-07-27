const { ObjectId } = require("mongodb");
const asyncHandler = require("express-async-handler");
const OrderModel = require("../models/orderModel");
const Razorpay = require("razorpay");
const crypto = require('crypto');


// @desc Get products
// @route GET /api/products
// @access Public
const getOrders = asyncHandler(async (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400);
  //     throw new Error("Please add a text field");
  //   }
  //   res.status(200).json({ message: "This is " });
  // const { query } = req;
  console.log(req.query.customer_id)
  orderList = await OrderModel.find({customer_id: req.query.customer_id});

  res.status(200).json({
    status: "success",
    data: orderList,
  });
});

// @desc Add order
// @route POST /api/addOrder
// @access Public
const addOrder = asyncHandler(async (req, res) => {
  const { body } = req;
  
  body._id = new ObjectId();
  const order = await OrderModel.create(body);
  res.status(200).json({
    status: "success",
    data: "Order created successfully.",
  });



});





// RAZORPAY

// @desc Add order
// @route POST /api/addOrder
// @access Public
const CreateOrder = asyncHandler(async (req, res) => {  
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }



});


// @desc Add order
// @route POST /api/addOrder
// @access Public
const ValidateOrder = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

module.exports = {
  getOrders,
  addOrder,
  CreateOrder,
  ValidateOrder
};
