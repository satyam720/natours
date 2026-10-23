import Review from "../models/reviewModel.js";
import AppError from "../Utils/appError.js";
import { catchAsync } from "../Utils/catchAsync.js";

const createReview = catchAsync(async function(req, res, next) {
    const {review, rating, tour, user} = req.body;
    if(!review){
        return (new AppError("Please Enter review in order to Add the review!", 404));
    }

    if(!rating){
        return (new AppError("cannot proceed to add review without Rating", 404));
    }

    if(!tour){
        return (new AppError("Review should be bound to a Tour!", 404));
    }

    if(!user){
        return (new AppError("Review should be written by a User", 404));
    }

    const newReview = await Review.create({
        review,
        rating,
        tour,
        user
    });

    res.status(201).json({
        status: 'success',
        data: {
            newReview
        }
    })

});

const getReview = catchAsync(async function(req,res,next) {
    const review = await Review.findById(req.params.id);
    if(!review){
        return (new AppError("No review found by this Id", 404));
    }

    res.status(200).json({
        status: 'succes',
        data: {
            review
        }
    })
});

const getAllReviews = catchAsync(async function(req,res,next) {
    const reviews = await Review.find();
    if(!reviews){
        return (new AppError("No review found by this Id", 404));
    }

    res.status(200).json({
        status: 'succes',
        data: {
            reviews,
            length: reviews.length
        }
    })
});

export  {createReview, getReview, getAllReviews};