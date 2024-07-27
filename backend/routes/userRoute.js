const express = require("express");
const router = express.Router();
const { getUsers, addAddress } = require("../controller/userController");

router.get("/:email", getUsers);
router.post("/address/", addAddress);
router.post("/address/:_id", addAddress);

module.exports = router;
