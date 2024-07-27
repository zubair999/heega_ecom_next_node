const { ObjectId } = require("mongodb");
var qs = require("qs");
const asyncHandler = require("express-async-handler");
const CollectionModel = require("../models/collectionModel");
const FilterModel = require("../models/filterModel");

// @desc Get products
// @route GET /api/products
// @access Public
const getCollections = asyncHandler(async (req, res) => {
  collectionList = await CollectionModel.find({});
  const totalCount = 4;
  const nPerPage = 10;

  res.status(200).json({
    status: "success",
    totalCount: totalCount,
    perPage: nPerPage,
    data: collectionList,
  });
});

const getCollectionsFilter = asyncHandler(async (req, res) => {
  const query = { collection_id: req.query.cid };
  filterList = await FilterModel.find(query);
  res.status(200).json({
    status: "success",
    data: filterList[0],
  });
});

module.exports = {
  getCollections,
  getCollectionsFilter,
};
