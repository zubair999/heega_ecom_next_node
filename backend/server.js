const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const Razorpay = require("razorpay");




const SECRET_KEY = "123456";

const port = process.env.PORT || 8000;
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const generateAnonymousJWT = (req, res, next) => {
  const anonymousToken = jwt.sign({ anonymous: true }, "123456");
  req.token = anonymousToken;
  next();
};

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};


// app.post("/order", async (req, res) => {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });

//     const options = req.body;
//     const order = await razorpay.orders.create(options);

//     if (!order) {
//       return res.status(500).send("Error");
//     }

//     res.json(order);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error");
//   }
// });

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  // order_id + "|" + razorpay_payment_id
  // sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  // const digest = sha.digest("hex");
  // if (digest !== razorpay_signature) {
  //   return res.status(400).json({ msg: "Transaction is not legit!" });
  // }

  res.json({
    msg: "success",
    // orderId: razorpay_order_id,
    // paymentId: razorpay_payment_id,
  });
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/collections", require("./routes/collectionRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/user", require("./routes/userRoute"));
// app.use("/api/order", require("./routes/"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started at port ${port}`));
