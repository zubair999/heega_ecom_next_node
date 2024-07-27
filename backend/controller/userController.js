const { ObjectId } = require("mongodb");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");

// @desc Get products
// @route GET /api/products
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  // const { query } = req;
  const user = await UserModel.findOne({email: req.params.email});
  if(!user){
    res.status(200).json({
      status: "success",
      data: user
    });  
  } else {
    res.status(200).json({
      status: "success",
      data: user
    });
  }
  // res.status(200).json({"jkdjf":req.params.email})
});




// @desc Add order
// @route POST /api/addOrder
// @access Public
const addAddress = asyncHandler(async (req, res) => {
  const userId = req.body._id
  const body = req.body
  // const user = await UserModel.findById(userId);
  // res.status(200).json({
  //   status: "success",
  //   data: "Address added succesfully",
  //   mess:user
  // });


  
  try {
      const user = await UserModel.findById(userId);
      if (!user) {
          throw new Error('User not found');
      }

      const userBody = {
        firstname: body.firstName,
        lastname: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        streetAddress: body.address,
        townCity: body.city,
        state: body.state,
        country: body.country,
        pincode: body.pincode,
        additionalInformation: body.additionalInfo,
        isSubscribed: body.isSubscribed || false,
        isTerm: body.isTerm || false ,
        isDefault: body.isDefault || false
    };

      if(user.addresses.length > 0) {
        const addressIndex = 0
          user.addresses[addressIndex] = userBody
        await user.save();
      } else {
        user.addresses.push(userBody);
        await user.save();
      }
      res.status(200).json({
        status: "success",
        data: "Address added succesfully"
      });

  } catch(error){
    res.status(200).json({
      status: "fail",
      message: "Error adding address",
    });
  }
  
});















module.exports = {
  getUsers,
  addAddress,
};
