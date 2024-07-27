const express = require("express");
const router = express.Router();
const {
  getCollections,
  getCollectionsFilter,
} = require("../controller/collectionController");

router.get("/", getCollections);
router.get("/filters", getCollectionsFilter);

module.exports = router;
