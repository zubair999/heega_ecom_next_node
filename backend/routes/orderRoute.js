const express = require("express");
const router = express.Router();
const { getOrders, addOrder, CreateOrder, ValidateOrder } = require("../controller/orderController");

router.get("/", getOrders);
router.post("/add", addOrder);
router.post("/create", CreateOrder);
router.post("/validate", ValidateOrder);

// router.route("/").get(protect, getSessions).post(protect, createSession);

module.exports = router;
