const { ObjectId } = require("mongodb");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
import { Request, Response } from "express";

// @desc Get all users
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: "sd",
  });
});



export { getUsers };

