import User from "../models/userModel.js";
import { catchAsync } from "../Utils/catchAsync.js";

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
        users,
        },
    });
});

const getUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'This route is not yet defined! Please use /signup instead'
    });
}

const createUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'This route is not yet defined! Please use /signup instead'
    });
}

const updateUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'This route is not yet defined! Please use /signup instead'
    });
}

const deleteUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'This route is not yet defined! Please use /signup instead'
    });
}

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
