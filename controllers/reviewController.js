import Review from "../models/reviewModel.js";
import AppError from "../Utils/appError.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";

const setTourUserIds = (req, res, next) => {
     let {review, rating} = req.body;
    // allow nested routes
    if(!req.body.tour){
        req.body.tour = req.params.tourId;
    }
    if(!req.body.user){
        req.body.user = req.user.id;
    }
    if(!review){
        return (new AppError("Please Enter review in order to Add the review!", 404));
    }

    if(!rating){
        return (new AppError("cannot proceed to add review without Rating", 404));
    }

    if(!req.body.tour){
        return (new AppError("Review should be bound to a Tour!", 404));
    }

    if(!req.body.user){
        return (new AppError("Review should be written by a User", 404));
    }

    next();
}

const createReview = createOne(Review);
const getReview = getOne(Review);
const getAllReviews = getAll(Review);
const deleteReview = deleteOne(Review);
const updateReview = updateOne(Review);

export  {createReview, getReview, getAllReviews, deleteReview, updateReview, setTourUserIds};