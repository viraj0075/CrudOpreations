import { get } from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncHandlers } from "../utils/asyncHandlers.js";

const createUser = AsyncHandlers(async (req, res) => {
  const { name, fathername, email, phone } = req.body;

  if ([name, fathername, email, phone].some((item) => item?.trim === "")) {
    throw new ApiError(400, "All Feilds are required");
  }

  const existedUser = await User.findOne({
    $or: [{ name }],
  });
  console.log(existedUser, "This is the existedUser");
  if (existedUser) {
    throw new ApiError(409, "User Already Exist");
  }

  const createUserInDb = await User.create({
    name,
    fathername,
    email,
    phone,
  });
  console.log(createUserInDb, "The User created Successfully in Db");
  if (!createUserInDb) {
    throw new ApiError(500, "Error While Registering the User");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createUserInDb,
        "User Created Successfully in Database"
      )
    );
});

const getUser = AsyncHandlers(async (req, res) => {
  const getUser = await User.find();
  if (!getUser) {
    throw new ApiError(404, "Cannot Get the User");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, getUser, "Users found successfully"));
});

const getUserById = AsyncHandlers(async (req, res) => {
  const UserId = req.params.id;
  const getUserbyIdData = await User.findById(UserId);
  if (!getUserbyIdData) {
    throw new ApiError(404, "Cannot Get User By Id");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, getUserbyIdData, "User found successfully"));
});

const updateUser = AsyncHandlers(async (req, res) => {
  const UserId = req.params.id;
  const { name, fathername, email, phone } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    UserId,
    {
      $set: {
        name,
        fathername,
        email,
        phone,
      },
    },
    {
      new: true,
    }
  );

  if (!updateUser) {
    throw new ApiError(500, "Something went wrong while updating the User");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateUser, "User Updateed Successfully"));
});

const deleteUser = AsyncHandlers(async (req, res) => {
  const UserId = req.params.id;
  const getUserbyIdData = await User.findById(UserId);

  if (getUserbyIdData) {
    const deleteUser = await User.findByIdAndDelete(UserId);
    console.log(deleteUser, "User is Deleted");
    if (!deleteUser) {
      throw new ApiError(500, "Something went wrong while Deleting the User");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deleteUser, "User Deleted Successfully"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, "User is Already Deleted"));
  }
});

export { createUser, getUser, updateUser, getUserById, deleteUser };
