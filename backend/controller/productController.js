const { ObjectId } = require("mongodb");
var qs = require("qs");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const mongoose = require("mongoose");

// @desc Get products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400);
  //     throw new Error("Please add a text field");
  //   }
  //   res.status(200).json({ message: "This is " });
  const { query } = req;
  let existingQueries = qs.parse(query, { ignoreQueryPrefix: true });
  let pageNumber = 1;
  const nPerPage = 20;
  let productsList;

  console.log("h")
  console.log(existingQueries)

  if (existingQueries.hasOwnProperty("_id")) {
    existingQueries._id = new ObjectId(existingQueries._id);
  }

  if (existingQueries.hasOwnProperty("page")) {
    pageNumber = existingQueries.page
    delete existingQueries['page']
  }

  console.log("love")
  console.log(existingQueries)

  

  const totalCount = await ProductModel.countDocuments(existingQueries)
    .then((count) => {
      return count;
    })
    .catch((err) => {
      console.error(err);
    });

  // if (totalCount == 1) {
  //   productsList = await ProductModel.findOne(
  //     existingQueries,
  //     "_id title body_html handle image.src images options variants"
  //   );
  // } else {
    productsList = await ProductModel.find(
      existingQueries,
      "_id title body_html handle image.src"
    )
    //   .sort({ _id: 1 })
    //   .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    //   .limit(nPerPage);
  // }

  res.status(200).json({
    status: "success",
    totalCount: totalCount,
    perPage: nPerPage,
    data: productsList,
  });
});

const getSingleProduct = asyncHandler(async (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400);
  //     throw new Error("Please add a text field");
  //   }
  //   res.status(200).json({ message: "This is " });
  const { query } = req;
  let existingQueries = qs.parse(query, { ignoreQueryPrefix: true });
  let pageNumber = 1;
  const nPerPage = 20;
  let product;



    product = await ProductModel.findOne(
      existingQueries,
      "_id title body_html handle image.src images options variants"
    );

  res.status(200).json({
    status: "success",
    data: product,
  });
});

const getTopSellerProducts = asyncHandler(async (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400);
  //     throw new Error("Please add a text field");
  //   }
  //   res.status(200).json({ message: "This is " });
  const { query } = req;
  let pageNumber = 1;
  const nPerPage = 20;
  let productsList;

  // console.log("hello prod")

  // let existingQueries = qs.parse(query, { ignoreQueryPrefix: true });

  // if (existingQueries.hasOwnProperty("_id")) {
  //   existingQueries._id = new ObjectId(existingQueries._id);
  // }
  

  

  // const totalCount = await ProductModel.countDocuments(existingQueries)
  //   .then((count) => {
  //     // console.log("Total documents:", count);
  //     return count;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  // if (totalCount == 1) {
  //   productsList = await ProductModel.findOne(existingQueries);
  // } else {

  // }

  // productsList = await ProductModel.find(existingQueries)
  // .sort({ _id: 1 })
  // .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
  // .limit(nPerPage);

  res.status(200).json({
    status: "success",
    totalCount: totalCount,
    perPage: nPerPage,
    data: [],
  });
});

const getProtectiveGearProducts = asyncHandler(async (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400);
  //     throw new Error("Please add a text field");
  //   }
  //   res.status(200).json({ message: "This is " });
  const { query } = req;
  let existingQueries = qs.parse(query, { ignoreQueryPrefix: true });

  if (existingQueries.hasOwnProperty("_id")) {
    existingQueries._id = new ObjectId(existingQueries._id);
  }

  let pageNumber = 1;
  const nPerPage = 4;
  let productsList;

  const totalCount = await ProductModel.countDocuments(existingQueries)
    .then((count) => {
      // console.log("Total documents:", count);
      return count;
    })
    .catch((err) => {
      console.error(err);
    });

  if (totalCount == 1) {
    productsList = await ProductModel.findOne(existingQueries);
  } else {
    productsList = await ProductModel.find(existingQueries)
      .sort({ _id: 1 })
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage);
  }

  res.status(200).json({
    status: "success",
    totalCount: totalCount,
    perPage: nPerPage,
    data: productsList,
  });
});

const getRelatedProducts = asyncHandler(async (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400);
  //     throw new Error("Please add a text field");
  //   }
  //   res.status(200).json({ message: "This is " });
  const { query } = req;
  let existingQueries = qs.parse(query, { ignoreQueryPrefix: true });

  if (existingQueries.hasOwnProperty("q")) {
    existingQueries.handle = existingQueries.q;
    delete existingQueries["q"];
  }

  const nPerPage = 5;
  let productsList;

  const product = await ProductModel.findOne(
    existingQueries,
    "_id related_product"
  );

  delete existingQueries["handle"];
  console.log("iji iii");
  console.log(existingQueries);

  const objectTYpe = [
    mongoose.Types.ObjectId("6669665f2a9147b79563f992"),
    mongoose.Types.ObjectId("666a7aa9b0d54934f2b0f234"),
  ];

  const objectTYpe1 = ["6669665f2a9147b79563f992", "666a7aa9b0d54934f2b0f234"];

  console.log(objectTYpe);

  existingQueries._id = { $in: objectTYpe1 };

  console.log(existingQueries);

  productsList = await ProductModel.find(
    existingQueries,
    "_id title body_html handle image.src"
  );

  res.status(200).json({
    status: "success",
    data: productsList,
  });
});

module.exports = {
  getProducts,
  getSingleProduct,
  getTopSellerProducts,
  getProtectiveGearProducts,
  getRelatedProducts,
};
